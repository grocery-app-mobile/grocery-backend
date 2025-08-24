import transporter from './mailConfig.js';

/**
 * Sends a dynamic KYC email with data from req.body
 * @param {Object} data - KYC form data
 * @param {String} to - recipient email
 */
const sendKYCEmail = async (data, to) => {

  const html = `
    <h2>KYC Submission - ${data?.companyName}</h2>
    <h3>Company Details</h3>
    <ul>
      <li><strong>Company Name:</strong> ${data?.companyName}</li>
      <li><strong>Address:</strong> ${data?.companyAddress}</li>
      <li><strong>Company Zipcode:</strong> ${data?.companyZipcode}</li>
      <li><strong>Company City:</strong> ${data?.companyCity}</li>
      <li><strong>CVR No.:</strong> ${data?.cvrNo}</li>
      <li><strong>Phone:</strong> ${data?.telephone}</li>
      <li><strong>Email:</strong> ${data?.companyEmail}</li>
      <li><strong>Website:</strong> ${data?.website}</li>
    </ul>

    <h3>Owner Details</h3>
    <ul>
      <li><strong>Name:</strong> ${data?.ownerName}</li>
      <li><strong>Address:</strong> ${data?.privateAddress}</li>
      <li><strong>Private Zipcode:</strong> ${data?.privateZipcode}</li>
      <li><strong>Private City:</strong> ${data?.privateCity}</li>
      <li><strong>Phone:</strong> ${data?.privateTelephone}</li>
      <li><strong>Email:</strong> ${data?.privateEmail}</li>
    </ul>

    <h3>Financial Info</h3>
    <ul>
      <li><strong>Monthly Turnover:</strong> ${data?.monthlyTurnover}</li>
      <li><strong>Transactions/Month:</strong> ${data?.transactionPerMonth}</li>
      <li><strong>Min/Max per Transaction:</strong> ${data?.minAmountPerTxt} - ${data?.maxAmountPerTxt}</li>
      <li><strong>Settlement Currency:</strong> ${data?.settlementCurrency}</li>
    </ul>

    <h3>Bank Details</h3>
    <ul>
      <li><strong>Bank:</strong> ${data?.bankName}</li>
      <li><strong>Account Name:</strong> ${data?.nameOnBankAcc}</li>
      <li><strong>IBAN:</strong> ${data?.iban}</li>
      <li><strong>SWIFT/BIC:</strong> ${data?.bicSwift}</li>
    </ul>

    <h3>Processor Info</h3>
    <ul>
      <li><strong>Earlier Processor:</strong> ${data?.earlierProcessor}</li>
      <li><strong>Reason for Change:</strong> ${data?.reasonForChangingCardProcessor}</li>
    </ul>

    <h3>Fees</h3>
    <ul>
      <li><strong>Fees (agreed):</strong> ${data?.fees}</li>
      <li><strong>SIM Card Charges:</strong> ${data?.simCardMonthlyCharge}</li>
      <li><strong>Other Charges:</strong> ${data?.otherMonthlyCharges}</li>
    </ul>

    <h3>Receipt & Settlement</h3>
    <ul>
      <li><strong>Name on Receipt:</strong> ${data?.nameOnReceipt}</li>
      <li><strong>Address on Receipt:</strong> ${data?.addressOnReceipt}</li>
      <li><strong>Receipt Zipcode:</strong> ${data?.receiptZipcode}</li>
      <li><strong>Receipt City:</strong> ${data?.receiptCity}</li>
      <li><strong>Settlement Options:</strong> ${data?.settlementOptions}</li>
    </ul>

    <h3>Attachments / Proof Links</h3>
    <ul>
      ${data?.utilityBill ? `<li><a href="${data?.utilityBill}">Utility Bill</a></li>` : ''}
      ${data?.passport ? `<li><a href="${data?.passport}">Passport</a></li>` : ''}
      ${data?.ssc ? `<li><a href="${data?.ssc}">Social Security Card</a></li>` : ''}
      ${data?.shopPhoto ? `<li><a href="${data?.shopPhoto}">Shop Photo</a></li>` : ''}
      ${data?.proofOfAccount ? `<li><a href="${data?.proofOfAccount}">Proof of Account</a></li>` : ''}
    </ul>
  `;

  await transporter.sendMail({
    from: `"KYC Form" <mypayaps@gmail.com>`,
    to,
    subject: `KYC Data of ${data?.companyName}`,
    html
  });
};

export default sendKYCEmail;
