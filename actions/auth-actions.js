"use server";
import { redirect } from "next/navigation";
import { simpleHash, userVerified } from "@/util/user";
import { createSession, createUser } from "../src/util/http";
import { revalidatePath } from "next/cache";
import validate from "deep-email-validator";
import PasswordValidator from "password-validator";
export async function sendMessage(state, event) {
  const errors = [];
  const data = Object.fromEntries(event);
  const first_name = event.get("firstName");
  const last_name = event.get("lastName");
  const phone = event.get("phone_number");
  const email = event.get("email");
  const gender = event.get("gender");
  const message = event.get("message");
  if (first_name.trim().length == 0) errors.push("first_name");
  if (last_name.trim().length == 0) errors.push("last_name");
  if (phone.trim().length !== 11) errors.push("phone");
  if (
    !email.includes(".") ||
    !email.includes("@") ||
    email.slice(0, email.indexOf("@")).length == 0 ||
    email.slice(email.indexOf("@") + 1, email.indexOf(".")).length == 0 ||
    email.slice(email.indexOf(".") + 1).length == 0
  )
    errors.push("email");
  if (gender != "on") errors.push("gender");
  if (message.trim().length < 5) errors.push("message");
  if (errors.length > 0) return { errors };
  let response = await fetch("http://localhost:8080/contact/add-message", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  redirect("/");
}
export async function signin(state, event) {
  const user = Object.fromEntries(event);
  const name = event.get("name");
  const phone = event.get("phone");
  const email = event.get("email");
  const emailValidate = await validate(email);
  const gender = event.get("gender");
  const choosen_gender = event.get("choosen_gender");
  const password = event.get("password");
  const passwordValidate = new PasswordValidator();
  const check_password = event.get("check_password");
  const errors = {
    name: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    check_password: "",
  };
  passwordValidate
    .is()
    .min(8)
    .is()
    .max(20)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();
  if (name.trim().length < 3) errors.name = "enter a valid name";
  if (phone.trim().length !== 11) errors.phone = "enter a valid phone number";
  if (gender !== "on") errors.gender = "please choose a gender";
  if (!emailValidate.validators.mx.valid)
    errors.email = "please enter a valid email";
  if (!passwordValidate.validate(password))
    errors.password =
      "please enter a valid password \n must be (8 <= characters <= 16)";
  if (
    check_password !== password ||
    check_password.trim().length < 8 ||
    check_password.trim().length > 16
  )
    errors.check_password = "check password must be like password";
  for (const value of Object.values(errors)) {
    if (value.length > 0) return { errors };
  }
  user.views = 0;
  user.followed = [];
  user.followers = [];
  user.posts = [];
  user.nots = [];
  user.avatar = "";
  const response = await createUser(user);
  if (response == "THE EMAIL ALREADY EXISTS") {
    errors.email = "the email is already exists";
    return { errors };
  }
  const hashId = email + password + email.split("").reverse();
  const id = simpleHash(hashId);
  await createSession(user, hashId);
}

export async function login(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const checkUser = JSON.parse(await userVerified(email, password));
  if (!checkUser.isVerified) return true;
  const hashId = email + password + email.split("").reverse();
  const id = simpleHash(hashId);
  const response = await fetch(
    `http://localhost:8080/login/create-session/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resMessage = await response.json();
  revalidatePath("/");
  redirect(`/profile/${id}`);
}
export async function logout(userId) {
  console.log(userId);
  const response = await fetch(`http://localhost:8080/user/logout/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  revalidatePath("/");
  redirect("/");
}