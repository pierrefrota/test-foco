import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export function Home() {
  return (
    <main>
      <div className={styles.content}>
        <h2>Bem-vindo(a) ao Sistema de Cadastro de Usuários</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <Link to="/register-user">
              <img src="/assets/img/user-plus.svg" alt="icone" />

              <span>Cadastrar novo usuário</span>
            </Link>
          </div>
          <div className={styles.card}>
            <Link to="/list-users">
              <img src="/assets/img/list.svg" alt="icone" />
              <span>Listar usuários</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
