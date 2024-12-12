import logo from 'assets/images/todo-logo.png';

export const AuthenticationLogo = () => {
  return (
    <div className='flex align-items-center mb-5 logo-container justify-content-between'>
      <span className='flex align-items-center'>
        <img src={logo} className='login-logo mr-1' alt='login-logo' width={60} />
        {/* <label style={{ fontSize: '1.7rem' }}>
          <b>GT-Hub</b>
        </label> */}
      </span>
      {/* <img src={greatechlogo} alt='login-logo' width={120} /> */}
    </div>
  );
};
