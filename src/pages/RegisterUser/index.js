import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import axios from "axios";

export function RegisterUser() {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [locale, setLocale] = useState("");
  const [number, setNumber] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cepError, setCepError] = useState("");
  const [localeError, setLocaleError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [bairroError, setBairroError] = useState("");
  const [cityError, setCityError] = useState("");
  const [ufError, setUfError] = useState("");

  useEffect(() => {
    loadUsersFromDb();
  }, []);

  async function loadUsersFromDb() {
    const localUsers = await localStorage.getItem("users");
    const localUsersFormatted = await JSON.parse(localUsers);

    setUsers(localUsersFormatted);
    console.log(localUsersFormatted);
  }

  async function registerUserHandle(e) {
    e.preventDefault();

    //Name
    if (fullName === "") {
      setFullNameError("Campo obrigatório");
      return;
    }
    setFullNameError("");

    //CPF
    if (!cpf) {
      setCpfError("Campo obrigatório");
      return;
    }
    if (cpf.length !== 11) {
      setCpfError("CPF inválido");
      return;
    }
    setCpfError("");

    //PHONE
    if (!phone) {
      setPhoneError("Campo obrigatório");
      return;
    }
    if (phone.length !== 11) {
      setPhoneError("Telefone inválido");
      return;
    }
    setPhoneError("");

    //EMAIL
    if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
      setEmailError("E-mail inválido");
      return;
    }
    setEmailError("");

    //CEP
    if (!/^[0-9]{8}$/.test(cep)) {
      setCepError("CEP inválido");
      return;
    }
    setCepError("");

    //LOCALE
    if (locale === "") {
      setLocaleError("Campo obrigatório");
      return;
    }
    setLocaleError("");

    //NUMBER
    if (number === "") {
      setNumberError("Campo obrigatório");
      return;
    }
    setNumberError("");

    //BAIRRO
    if (bairro === "") {
      setBairroError("Campo obrigatório");
      return;
    }
    setBairroError("");

    //CITY
    if (city === "") {
      setCityError("Campo obrigatório");
      return;
    }
    setCityError("");

    //UF
    if (uf === "") {
      setUfError("Campo obrigatório");
      return;
    }
    setUfError("");

    // api
    //   .post("/users", {
    //     id: uuidv4(),
    //     name: fullName,
    //     cpf,
    //     phone,
    //     email,
    //     cep,
    //     locale,
    //     number,
    //     bairro,
    //     city,
    //     uf,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     toast.success("Usuário cadastrado com sucesso.");
    //   });

    try {
      if (users) {
        await localStorage.setItem(
          "users",
          JSON.stringify([
            ...users,
            {
              id: uuidv4(),
              name: fullName,
              cpf,
              phone,
              email,
              cep,
              locale,
              number,
              bairro,
              city,
              uf,
            },
          ])
        );
        history.push("/");
      } else {
        await localStorage.setItem(
          "users",
          JSON.stringify([
            {
              id: uuidv4(),
              name: fullName,
              cpf,
              phone,
              email,
              cep,
              locale,
              number,
              bairro,
              city,
              uf,
            },
          ])
        );
        history.push("/");
      }
      toast.success("Usuário cadastrado com sucesso.");
    } catch (error) {
      console.log(error.message);
      toast.success("Houve um erro ao cadastrar o usuário.");
    }
  }

  async function handleCepRequest(cep) {
    setCep(cep);

    if (/^[0-9]{5}-[0-9]{3}$/.test(cep) || /^[0-9]{8}$/.test(cep)) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        console.log(res.data);
        setLocale(res.data.logradouro);
        setBairro(res.data.bairro);
        setCity(res.data.localidade);
        setUf(res.data.uf);
      });
    }
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Cadastrar novo usuário</h2>

          <form>
            <div className={styles.info}>
              <span className={styles.errorMessage}>Nome*</span>

              <input
                type="text"
                onChange={(text) => setFullName(text.target.value)}
                placeholder="Nome completo"
                value={fullName}
              />
              {fullNameError && (
                <span className={styles.errorMessage}>{fullNameError}</span>
              )}
              <div className={styles.infoRow}>
                <input
                  type="text"
                  onChange={(text) => setCpf(text.target.value)}
                  placeholder="CPF"
                  value={cpf}
                />
                <input
                  type="text"
                  onChange={(text) => setPhone(text.target.value)}
                  placeholder="Telefone"
                  value={phone}
                />
              </div>
              <div className={styles.errorMessageRight}>
                {phoneError && (
                  <span className={styles.errorMessage}>{phoneError}</span>
                )}
              </div>
              <div className={styles.errorMessageLeft}>
                {cpfError && (
                  <span className={styles.errorMessage}>{cpfError}</span>
                )}
              </div>
              <input
                type="text"
                onChange={(text) => setEmail(text.target.value)}
                placeholder="Email"
                value={email}
              />
              {emailError && (
                <span className={styles.errorMessage}>{emailError}</span>
              )}
            </div>
            <div className={styles.address}>
              <input
                type="text"
                onChange={(text) => {
                  handleCepRequest(text.target.value);
                }}
                placeholder="CEP"
              />
              {cepError && (
                <span className={styles.errorMessage}>{cepError}</span>
              )}
              <div className={styles.addressRow}>
                <input
                  type="text"
                  value={locale}
                  onChange={(text) => setLocale(text.target.value)}
                  placeholder="Rua"
                />

                <input
                  className={styles.addressNumber}
                  value={number}
                  type="text"
                  placeholder="N°"
                  onChange={(text) => setNumber(text.target.value)}
                />
              </div>
              <div className={styles.errorMessageRight}>
                {numberError && (
                  <span className={styles.errorMessage}>{numberError}</span>
                )}
              </div>
              <div className={styles.errorMessageLeft}>
                {localeError && (
                  <span className={styles.errorMessage}>{localeError}</span>
                )}
              </div>
              <input
                type="text"
                onChange={(text) => setBairro(text.target.value)}
                placeholder="Bairro"
                value={bairro}
              />
              {bairroError && (
                <span className={styles.errorMessage}>{bairroError}</span>
              )}
              <div className={styles.addressRow}>
                <input
                  type="text"
                  onChange={(text) => setCity(text.target.value)}
                  placeholder="Cidade"
                  value={city}
                />
                <input
                  type="text"
                  onChange={(text) => setUf(text.target.value)}
                  placeholder="Estado"
                  value={uf}
                />
              </div>
              <div className={styles.errorMessageLeft}>
                {cityError && (
                  <span className={styles.errorMessage}>{cityError}</span>
                )}
              </div>
              <div className={styles.errorMessageRight}>
                {ufError && (
                  <span className={styles.errorMessage}>{ufError}</span>
                )}
              </div>
            </div>

            <button
              className={styles.buttonSubmit}
              onClick={registerUserHandle}
              type="submit"
            >
              Cadastrar
            </button>
            <button
              className={styles.buttonBack}
              onClick={() => history.push("/")}
            >
              Voltar
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
