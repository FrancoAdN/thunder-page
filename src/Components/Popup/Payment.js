import React, { useEffect, useContext } from 'react'
import { prov } from './_useHook'
import axios from 'axios'
import './payment.css'



export default function Payment({ set }) {

    const { email, price, fetchInformation } = useContext(prov)
    // const testkey = "TEST-93a454a8-2835-421c-b74c-e97a501cefc3"
    const prod_key = "APP_USR-7d3c2ba3-1e93-4383-b931-5fd9e302d204"

    useEffect(() => {
        window.Mercadopago.setPublishableKey(prod_key);
        window.Mercadopago.getIdentificationTypes();

        document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

        function guessPaymentMethod(event) {
            let cardnumber = document.getElementById("cardNumber").value;
            if (cardnumber.length >= 6) {
                let bin = cardnumber.substring(0, 6);
                window.Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethod);
            }
        };

        function setPaymentMethod(status, response) {
            if (status === 200) {
                let paymentMethod = response[0];
                document.getElementById('paymentMethodId').value = paymentMethod.id;

                if (paymentMethod.additional_info_needed.includes("issuer_id")) {
                    getIssuers(paymentMethod.id);
                } else {
                    getInstallments(
                        paymentMethod.id,
                        document.getElementById('transactionAmount').value
                    );
                }
            } else {
                alert(`payment method info error: ${response}`);
            }
        }

        function getIssuers(paymentMethodId) {
            window.Mercadopago.getIssuers(
                paymentMethodId,
                setIssuers
            );
        }

        function setIssuers(status, response) {
            if (status === 200) {
                let issuerSelect = document.getElementById('issuer');
                response.forEach(issuer => {
                    let opt = document.createElement('option');
                    opt.text = issuer.name;
                    opt.value = issuer.id;
                    issuerSelect.appendChild(opt);
                });

                getInstallments(
                    document.getElementById('paymentMethodId').value,
                    document.getElementById('transactionAmount').value,
                    issuerSelect.value
                );
            } else {
                alert(`issuers method info error: ${response}`);
            }
        }

        function getInstallments(paymentMethodId, transactionAmount, issuerId) {
            window.Mercadopago.getInstallments({
                "payment_method_id": paymentMethodId,
                "amount": parseFloat(transactionAmount),
                "issuer_id": issuerId ? parseInt(issuerId) : undefined
            }, setInstallments);
        }

        function setInstallments(status, response) {
            if (status === 200) {
                document.getElementById('installments').options.length = 0;
                response[0].payer_costs.forEach(payerCost => {
                    let opt = document.createElement('option');
                    opt.text = payerCost.recommended_message;
                    opt.value = payerCost.installments;
                    document.getElementById('installments').appendChild(opt);
                });
            } else {
                alert(`installments method info error: ${response}`);
            }
        }

        let doSubmit = false;
        document.getElementById('paymentForm').addEventListener('submit', getCardToken);
        function getCardToken(event) {
            event.preventDefault();
            if (!doSubmit) {
                let $form = document.getElementById('paymentForm');
                window.Mercadopago.createToken($form, setCardTokenAndPay);
                return false;
            }
        };

        function setCardTokenAndPay(status, response) {
            if (status === 200 || status === 201) {
                let form = document.getElementById('paymentForm');
                let card = document.createElement('input');
                card.setAttribute('name', 'token');
                card.setAttribute('type', 'hidden');
                card.setAttribute('value', response.id);
                form.appendChild(card);

                doSubmit = true;
                const data = {
                    transactionAmount: form.transactionAmount.value,
                    token: form.token.value,
                    description: form.description.value,
                    installments: form.installments.value,
                    paymentMethodId: form.paymentMethodId.value,
                    issuer: form.issuer.value,
                    email,
                    docType: form.docType.value,
                    docNumber: form.docNumber.value
                }
                // console.log(data)
                // form.submit();
                axios.post('https://thunderboosting.com/process_payment', data).then((resp) => {
                    if (resp !== 400) {
                        const rtn = fetchInformation()
                        if (rtn === 400) {
                            alert("Hubo un error al enviar tu información por favor intente más tarde")
                        } else {
                            alert("Pago existoso")
                            set(false)
                        }
                    } else alert("Hubo un error en el pago, por favor reviselo")
                })

            } else {
                alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
            }
        };


    }, [])


    return (

        <form className="paymentForm" action="" method="post" id="paymentForm" onSubmit={(e) => e.preventDefault()}>
            <h3 className="paymentTitle">Detalles del comprador</h3>
            <div className="paymentHeader">
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="text" value={email} />
                </div>
                <div className="typeDoc">
                    <label htmlFor="docType"></label>
                    <select id="docType" name="docType" data-checkout="docType" type="text"></select>
                </div>
                <div className="numberDoc">
                    <label htmlFor="docNumber"></label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" placeholder="Número de documento" />
                </div>
            </div>
            <h3 className="paymentTitle2">Detalles de la tarjeta</h3>
            <div className="payHeader">
                <div className="paymentUser">
                    <label htmlFor="cardholderName">Titular de la tarjeta</label>
                    <input id="cardholderName" type="text" data-checkout="cardholderName" type="text" placeholder="" />
                </div>
                <div className="paymentCardNumber">
                    <label htmlFor="cardNumber">Número de la tarjeta</label>
                    <input type="text" id="cardNumber" data-checkout="cardNumber" placeholder="0000 0000 0000 0000"
                        onPaste={() => { return true }}
                        onCopy={() => { return false }} onCut={() => { return false }}
                        onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                </div>
                <div>
                    <label htmlFor="">Fecha de vencimiento</label>
                    <div className="paymentExpire">
                        <input className="mes" type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onPaste={() => { return false }}
                            onCopy={() => { return false }} onCut={() => { return false }}
                            onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                        <span className="date-separator"></span>
                        <input className="año" type="text" placeholder="AA" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            onPaste={() => { return false }}
                            onCopy={() => { return false }} onCut={() => { return false }}
                            onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                    </div>
                </div>
                <div className="paymentCode">
                    <label htmlFor="securityCode">CVC</label>
                    <input id="securityCode" data-checkout="securityCode" type="text" placeholder="000"
                        onPaste={() => { return false }}
                        onCopy={() => { return false }} onCut={() => { return false }}
                        onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                </div>
                <div className="payBank" id="issuerInput">
                    <label htmlFor="issuer">Banco emisor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
                </div>
                <div className="payDues">
                    <label htmlFor="installments">Cuotas</label>
                    <select type="text" id="installments" name="installments"></select>
                </div>
                <div>
                    <input type="hidden" name="transactionAmount" id="transactionAmount" value={price} />
                    <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                    <input type="hidden" name="description" id="description" value="Thunder boosting" />
                    <br />
                    <button type="submit">Pagar</button>
                    <br />
                </div>
            </div>
        </form>

    )
}

