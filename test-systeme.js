const apiKey = "p3efbbimnq32ruxqh3e2hjq2bsl6vdjgmclc7019ory9vhaypy2s2ujjhtsbmijs";

async function testSystemeAPI() {
  console.log("Testeando conexión con Systeme.io nuevamente...");
  try {
    const res = await fetch("https://api.systeme.io/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        email: "hola+prueba123@gladysgarciacoach.com",
        locale: "es",
        fields: [
          {
            slug: "first_name",
            value: "Test Lead"
          },
          {
            slug: "phone_number",
            value: "+52 1 55 1234 1234"
          }
        ]
      })
    });
    
    const data = await res.json();
    console.log("Status:", res.status);
    console.dir(data, { depth: null });
  } catch (err) {
    console.error("Error:", err);
  }
}

testSystemeAPI();
