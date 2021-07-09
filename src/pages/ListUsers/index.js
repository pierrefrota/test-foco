import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.scss";

export function ListUsers() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // api
    //   .get("/users")
    //   .then((response) => setUsers(response.data))
    //   .catch((err) => {
    //     console.error("ops! ocorreu um erro" + err.message);
    //   });

    loadUsersFromDb();
  }, []);

  async function loadUsersFromDb() {
    const localUsers = await localStorage.getItem("users");
    const localUsersFormatted = await JSON.parse(localUsers);

    setUsers(localUsersFormatted);
    console.log(localUsersFormatted);
  }

  async function deleteUserById(id) {
    // api
    //   .delete(`/users/${id}`)
    //   .then((response) => {
    //     toast.success("Usuário deletado com sucesso.");
    //     const filtered = users.filter((user) => user.id !== id);
    //     setUsers(filtered);
    //   })
    //   .catch((err) => {
    //     toast.error("Ocorreu um erro ao deletar o usuário.");
    //   });

    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);

    localStorage.setItem("users", JSON.stringify(filtered));
  }

  if (!users) {
    return (
      <div>
        <h3>Nenhum usuário cadastrado</h3>
        <button onClick={() => history.push("/")}>Voltar</button>
      </div>
    );
  }
  return (
    <main>
      <div className={styles.content}>
        <h2>Lista de usuários</h2>
        <div className={styles.userContainer}>
          {users.map((user) => {
            return (
              <div className={styles.card} key={user.id}>
                <div className={styles.userInfo}>
                  <h3>{user.name}</h3>
                  <span>Telefone: {user.phone}</span>
                  <span>CPF: {user.cpf}</span>
                  <div className={styles.cardFooter}>
                    <Link to={`/user-details/${user.id}`}>Ver detalhes</Link>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => deleteUserById(user.id)}>
                    <img src="/assets/img/trash.svg" alt="Remover" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
