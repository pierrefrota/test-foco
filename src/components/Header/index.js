import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header>
      <div className={styles.content}>
        <Link to="/">
          <img src="/assets/img/logo_foco.png" alt="Foco Multimídia" />
        </Link>
        <Link to="/register-user">
          <button type="button">
            <span className={styles.newUser}>Novo usuário</span>
            <span className={styles.plus}>+</span>
          </button>
        </Link>
      </div>
    </header>
  );
}
