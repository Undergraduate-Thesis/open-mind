export default function({ store, redirect }) {
  //ini berlaku untuk nuxt mode SPA (client-side), jika mode Universal(server-side) caranya beda lagi (mode universal lumayan ribet wkwk)
  if (localStorage.getItem("access_token") != null) {
    return redirect("/");
  }
}
