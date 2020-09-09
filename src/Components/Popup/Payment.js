import React, { useEffect, useContext } from 'react'
import { prov } from './_useHook'
import axios from 'axios'



export default function Payment() {

    const { email, price } = useContext(prov)
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
                axios.post('https://thunderboosting.com/process_payment', data).then((resp) => console.log(resp.status))

            } else {
                alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
            }
        };


    }, [])


    return (
        <form action="" method="post" id="paymentForm" onSubmit={(e) => e.preventDefault()}>
            <h3>Detalles del comprador</h3>
            <div>
                {/* <div>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="text" value={email} />
                </div> */}
                <div>
                    <label htmlFor="docType">Tipo de documento</label>
                    <select id="docType" name="docType" data-checkout="docType" type="text"></select>
                </div>
                <div>
                    <label htmlFor="docNumber">Número de documento</label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" />
                </div>
            </div>
            <h3>Detalles de la tarjeta</h3>
            <div>
                <div>
                    <label htmlFor="cardholderName">Titular de la tarjeta</label>
                    <input id="cardholderName" data-checkout="cardholderName" type="text" />
                </div>
                <div>
                    <label htmlFor="">Fecha de vencimiento</label>
                    <div>
                        <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onPaste={() => { return false }}
                            onCopy={() => { return false }} onCut={() => { return false }}
                            onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                        <span className="date-separator">/</span>
                        <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            onPaste={() => { return false }}
                            onCopy={() => { return false }} onCut={() => { return false }}
                            onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                    </div>
                </div>
                <div>
                    <label htmlFor="cardNumber">Número de la tarjeta</label>
                    <input type="text" id="cardNumber" data-checkout="cardNumber"
                        onPaste={() => { return true }}
                        onCopy={() => { return false }} onCut={() => { return false }}
                        onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                </div>
                <div>
                    <label htmlFor="securityCode">Código de seguridad</label>
                    <input id="securityCode" data-checkout="securityCode" type="text"
                        onPaste={() => { return false }}
                        onCopy={() => { return false }} onCut={() => { return false }}
                        onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                </div>
                <div id="issuerInput">
                    <label htmlFor="issuer">Banco emisor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
                </div>
                <div>
                    <label htmlFor="installments">Cuotas</label>
                    <select type="text" id="installments" name="installments"></select>
                </div>
                <div>
                    <input type="hidden" name="transactionAmount" id="transactionAmount" value={price} />
                    <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                    <input type="hidden" name="description" id="description" />
                    <br />
                    <button type="submit">Pagar</button>
                    <br />
                </div>
            </div>
        </form>
    )
}
