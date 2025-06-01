import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";

export default function SignUp() {
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.nickname.length < 2 || form.nickname.length > 20) {
      setError("닉네임은 2~20자여야 합니다.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (
      form.password.length < 8 ||
      form.password.length > 30 ||
      !/(.*[A-Za-z].*)(.*\d.*|.*[!@#$%^&*()].*)/.test(form.password)
    ) {
      setError("비밀번호는 8~30자, 영문/숫자/특수기호 중 2가지 이상 포함이어야 합니다.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("https://api.cheer-up.net/api/users/signup", {
        username: form.nickname,
        email: form.email,
        password: form.password,
        role: "USER", // 필요 시 다른 역할로 변경 가능
      });

      alert("회원가입 성공! 로그인해주세요.");
      // 이후 로그인 페이지로 이동 등 처리 가능
      window.location.href = "/signin";
    } catch (err) {
      setError(
        err.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.title}>회원가입</h2>

        {/* 닉네임 */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            maxLength={20}
          />
          <div className={styles.inputHint}>최소 2자 이상, 최대 20자</div>
        </div>

        {/* 이메일 */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWithIcon}>
            <input
              className={styles.input}
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              maxLength={30}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              tabIndex={-1}
              onClick={() => setShowPw((v) => !v)}
            >
              <span className="material-icons" style={{ fontSize: 20, color: "#9A9A9A" }}>
                {showPw ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
          <div className={styles.inputHint}>최소 8자 이상 최대 30자 이하</div>
          <div className={styles.inputHint}>영문/숫자/특수기호 중, 2가지 이상 포함</div>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWithIcon}>
            <input
              className={styles.input}
              type={showPw2 ? "text" : "password"}
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              value={form.passwordConfirm}
              onChange={handleChange}
              maxLength={30}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              tabIndex={-1}
              onClick={() => setShowPw2((v) => !v)}
            >
              <span className="material-icons" style={{ fontSize: 20, color: "#9A9A9A" }}>
                {showPw2 ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && <div className={styles.errorMsg}>{error}</div>}

        {/* 회원가입 버튼 */}
        <button className={styles.signupBtn} type="submit">
          회원가입
        </button>

        {/* 안내문구 */}
        <div className={styles.info}>
          해당 계정은 통합회원으로 웹사이트와 어플에서 제공하는 서비스를 모두 이용하실 수 있습니다. 가입 시, 통합 계정 및 서비스 이용약관, 개인정보 처리방침에 동의하는 것으로 간주합니다.
        </div>
      </form>

      {/* cheerup 로고 */}
      <div className={styles.cheerupLogo}>cheerup</div>
      <div className={styles.homeIndicator}></div>
    </div>
  );
}
