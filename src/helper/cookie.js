const Cookies = require("js-cookie");
export function setCookie(cname, cvalue, exdays) {
  if (typeof window !== "undefined" && window.document) {
    Cookies.set(cname, cvalue, {
      expires: 1,
      path: "/",
      secure: true,
      sameSite: "None",
      domain: "absensismk4.4muda.co",
    });
    // const d = new Date();

    // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    // let expires = "expires=" + d.toUTCString();
    // document.cookie =
    //   cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
  }
}

export function getCookie(cname) {
  if (typeof window !== "undefined" && window.document) {
    return Cookies.get(cname);
  }
}

export function clearAllCookies() {
  if (typeof window !== "undefined" && window.document) {
    // Menghapus semua cookie
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName, {
        path: "/",
        domain: window.location.hostname,
      });
    });
  }
}
