const nodemailer = require("nodemailer");

async function testConfig(host, pass) {
  const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true,
    auth: {
      user: "hola@gladysgarciacoach.com",
      pass: pass,
    },
  });

  try {
    await transporter.verify();
    console.log(`✅ ¡ÉXITO! Host: ${host} | Pass: ${pass}`);
  } catch (e) {
    console.log(`❌ ERROR. Host: ${host} | Pass: ${pass} | Motivo: ${e.message}`);
  }
}

async function runTests() {
  console.log("Probando combinaciones...\n");
  await testConfig("smtp.titan.email", "cuaderno53A");
  await testConfig("smtpout.secureserver.net", "cuaderno53A");
  await testConfig("smtp.titan.email", "cuaderno53A.");
  await testConfig("smtpout.secureserver.net", "cuaderno53A.");
}

runTests();
