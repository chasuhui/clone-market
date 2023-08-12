const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  //{id:'abc', password:'123'}
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);
  //window.sessionStorage.setItem("token", accessToken);
  alert("로그인되었습니다");
  window.location.pathname = "/";

  //상품가져오기 잘 되었는지 확인했으니 주석 처리
  // const infoDiv = document.querySelector("#info");
  // infoDiv.innerText = "로그인 되었습니다";

  // const btn = document.createElement("button");
  // btn.innerText = "상품 가져오기";
  // btn.addEventListener("click", async () => {
  //   const res = await fetch("/items", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // });
  // infoDiv.appendChild(btn);
  //주석처리 여기까지

  //status코드는 서버에서 내려줌
  //InvalidCredentialsException이 401을 자동으로 생성해서 내려줌
  //return '200' 지정하지 않고, 'hi' 이런 식으로 지정해도 status 값은 200으로 내려옴
  // if (res.status === 200) {
  //   alert("로그인에 성공했습니다");
  //   window.location.pathname = "/";
  // } else if (res.status === 401) {
  //   alert("아이디 또는 비밀번호가 틀렸습니다.");
  // }
};

form.addEventListener("submit", handleSubmit);
