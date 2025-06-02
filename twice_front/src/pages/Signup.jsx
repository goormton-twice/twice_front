import React, { useState } from "react";
import { signupUser } from "../api/userApi";
import styles from "./Signup.module.css";
import EmailResult from "./EmailResult";

export function EmailAuthPage() {
  const [popupMsg, setPopupMsg] = useState("");

  // "여기" 클릭 시
  const handleResend = () => {
    // 실제 메일 재발송 API 호출하는 곳
    setPopupMsg("hanhee@gmail.com 로 인증 메일을 재발송하였습니다.");
  };

  return (
    <EmailResult
      icon="/mail_icon.svg"
      title={<><span style={{ fontWeight: 500 }}>hanhee@gmail.com</span> <br />로 인증 메일이 발송되었습니다.</>}
      desc={<>메일 내에 있는 인증 버튼을 클릭하신 뒤<br />아래 인증 확인 버튼을 눌러 주세요.</>}
      buttonText="인증 확인"
      onButtonClick={() => {
        // 인증 확인 시 처리
      }}
      subInfo="메일 재발송이 필요하시면, 여기를 눌러주세요."
      subLinkLabel="여기"
      onSubLinkClick={handleResend}
      popupMsg={popupMsg}
      setPopupMsg={setPopupMsg}
    />
  );
}

// 회원가입 완료 예시
export function SignupSuccessPage({ nickname }) {
  return (
    <EmailResult
      icon="/heart_icon.svg"
      title="회원가입이 성공적으로 완료되었습니다."
      desc={<>{nickname}님의 하루를<br />응원하러 갈 시간이에요!</>}
      buttonText="홈으로 이동하기"
      onButtonClick={() => {
        window.location.href = "/"; // 예시
      }}
    />
  );
}

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
      await signupUser(form.nickname, form.email, form.password, "USER");

      alert("회원가입 성공! 로그인해주세요.");
      // 이후 로그인 페이지로 이동 등 처리 가능
      window.location.href = "/signin";
    } 
    catch (err) {
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
          <div className={styles.inputWithIcon}>
          <input
            className={styles.input}
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            maxLength={20}
          />
          </div>
          <div className={styles.inputHint}>최소 2자 이상, 최대 20자
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>

        {/* 이메일 */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWithIcon}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
        </div>
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
              <img src={showPw ? "/eye_on.svg" : "/eye_off.svg"} alt="비밀번호 표시" />
            </button>
          </div>
          <div className={styles.inputHint}>최소 8자 이상 최대 30자 이하<br></br>영문/숫자/특수기호 중, 2가지 이상 포함</div>
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
              <img src={showPw ? "/eye_on.svg" : "/eye_off.svg"} alt="비밀번호 표시" />
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
      <div className={styles.logo}><img src="/signuplogo.svg" alt="cheerup logo" /></div>
    </div>
  );
}
