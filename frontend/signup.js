const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");
  if (password1 === password2) {
    return true;
  } else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  //{id:'abc', password:'123'}
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  console.log(formData.get("password"));

  const div = document.querySelector("#info");

  //회원가입에 성공했습니다 메시지도, 서버에서 200 메시지를 보내줬을 때(성공했다는) 바꿔줘야 함
  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      //   div.innerText = "회원가입에 성공했습니다";
      //   div.style.color = "blue";
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 일치하지 않습니다";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);