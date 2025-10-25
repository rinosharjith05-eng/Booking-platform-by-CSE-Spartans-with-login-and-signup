/* Lightweight client-side auth helpers
   - This file intentionally contains only client-side logic and placeholders.
   - Replace fetch URLs with your server endpoints when integrating.
*/
(function(){
  // Simple email regex for client validation
  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  window.validateSignup = function({name, email, password}){
    if(!name || !email || !password) return {ok:false, msg:'All fields required.'};
    if(!emailRE.test(email)) return {ok:false, msg:'Invalid email.'};
    if(password.length < 6) return {ok:false, msg:'Password too short.'};
    return {ok:true};
  };

  window.signup = async function(formEl){
    const name = formEl.name.value.trim();
    const email = formEl.email.value.trim();
    const password = formEl.password.value;

    const v = validateSignup({name,email,password});
    const info = formEl.querySelector('.info');
    if(!v.ok){ info.textContent = v.msg; return false; }

    info.textContent = 'Creating account...';
    console.log("auth.js is loaded!");
    try{
      // Placeholder: replace URL with your backend signup endpoint
      // const res = await fetch('/api/signup', {method:'POST', body:JSON.stringify({name,email,password}), headers:{'content-type':'application/json'}});
      // const data = await res.json();
      // simulate
      await new Promise(r=>setTimeout(r,800));
      info.textContent = '✅ Account created. Redirecting to login...';
      setTimeout(()=>location.href = 'login.html', 900);
    }catch(err){
      info.textContent = 'Signup failed. Try again later.';
    }
    return false;
  };

  window.login = async function(formEl){
    const email = formEl.email.value.trim();
    const password = formEl.password.value;
    const info = formEl.querySelector('.info');

    if(!emailRE.test(email)){ info.textContent = 'Enter a valid email.'; return false; }
    if(!password){ info.textContent = 'Enter your password.'; return false; }

    info.textContent = 'Signing in...';
    try{
      // Placeholder: replace with your backend auth call
      // const res = await fetch('/api/login', {method:'POST', body:JSON.stringify({email,password}), headers:{'content-type':'application/json'}});
      // const data = await res.json();
      await new Promise(r=>setTimeout(r,700));
      info.textContent = '✅ Logged in. Redirecting...';
      // on success, redirect
      setTimeout(()=>location.href = 'index.html', 700);
    }catch(err){
      info.textContent = 'Login failed. Check credentials.';
    }
    return false;
  };

})();
