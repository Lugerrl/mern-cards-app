function LoggedInName() {
    const _ud = localStorage.getItem('user_data');
    if (!_ud) return null;
  
    const { firstName, lastName } = JSON.parse(_ud);
  
    function doLogout() {
      localStorage.removeItem('user_data');
      window.location.href = '/';
    }
  
    return (
      <div>
        <span>Logged in as {firstName} {lastName}</span><br />
        <button onClick={doLogout}>Log Out</button>
      </div>
    );
  }
  
  export default LoggedInName;
  
  