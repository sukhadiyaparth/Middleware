const RegisterPage = () => {
    const handleRegister = async (e:any) => {
      e.preventDefault();
      // Handle registration logic here
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterPage;