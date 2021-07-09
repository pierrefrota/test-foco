import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.scss";

export function UserDetails() {
  let history = useHistory();
  let { id } = useParams();

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // api
    //   .get(`/users/${id}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setUser(response.data);
    //   })
    //   .catch((err) => {
    //     console.error("ops! ocorreu um erro: " + err.message);
    //   });

    loadUsersFromDb();
  }, [id]);

  async function loadUsersFromDb() {
    const localUsers = await localStorage.getItem("users");
    const localUsersFormatted = await JSON.parse(localUsers);

    setUsers(localUsersFormatted);

    const filteredUser = localUsersFormatted.filter((user) => user.id === id);

    console.log(filteredUser);
    setUser(filteredUser[0]);
  }

  async function deleteUserById(id) {
    const answer = window.confirm("Deletar usuário?");
    if (answer) {
      // api
      //   .delete(`/users/${id}`)
      //   .then((response) => {
      //     toast.success("Usuário deletado com sucesso.");
      //     history.push("/");
      //   })
      //   .catch((err) => {
      //     toast.error("Ocorreu um erro ao deletar o usuário.");
      //   });

      const filtered = users.filter((user) => user.id !== id);

      localStorage.setItem("users", JSON.stringify(filtered));

      toast.success("Redirecionando para pagina inicial.");
      toast.success("Usuário deletado com sucesso.");

      setTimeout(() => {
        history.push("/");
      }, 3000);
    } else {
      //
    }
  }

  return (
    <main>
      <div className={styles.content}>
        <h2>Detalhes do usuário</h2>
        <div className={styles.userContainer}>
          <div className={styles.card}>
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <span>Telefone: {user.phone}</span>
              <span>CPF: {user.cpf}</span>
              <p>E-mail: {user.email}</p>
            </div>

            <div className={styles.address}>
              <h3>Endereço</h3>

              <span>{user.locale}, 99</span>
              <span>Bairro: {user.bairro}</span>
              <span>
                {user.city} - {user.uf}
              </span>
              <span>CEP: {user.cep}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button onClick={() => deleteUserById(user.id)}>
              <span>Deletar usuário</span>
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
