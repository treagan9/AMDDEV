// src/admin/lib/useAuth.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import supabase from './supabase.jsx';

var AuthContext = createContext(null);

function AuthProvider({ children }) {
  var [user, setUser] = useState(null);
  var [teamMember, setTeamMember] = useState(null);
  var [loading, setLoading] = useState(true);

  useEffect(function () {
    supabase.auth.getSession().then(function (result) {
      var session = result.data.session;
      setUser(session ? session.user : null);
      if (session) fetchTeamMember(session.user.id);
      else setLoading(false);
    });

    var { data: listener } = supabase.auth.onAuthStateChange(function (event, session) {
      setUser(session ? session.user : null);
      if (session) fetchTeamMember(session.user.id);
      else {
        setTeamMember(null);
        setLoading(false);
      }
    });

    return function () { listener.subscription.unsubscribe(); };
  }, []);

  useEffect(function () {
    if (!teamMember) return;
    updatePresence();
    var interval = setInterval(updatePresence, 60000);
    return function () { clearInterval(interval); };
  }, [teamMember]);

  function updatePresence() {
    if (!teamMember) return;
    supabase.from('team_members').update({ last_seen_at: new Date().toISOString() }).eq('id', teamMember.id).then(function () {});
  }

  function fetchTeamMember(authId) {
    supabase.from('team_members').select('*').eq('auth_user_id', authId).single().then(function (result) {
      setTeamMember(result.data || null);
      setLoading(false);
    });
  }

  async function signIn(email, password) {
    var result = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (result.error) throw result.error;
    return result.data;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setTeamMember(null);
  }

  async function resetPassword(email) {
    var result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/answersmd-admin/reset-password/'
    });
    if (result.error) throw result.error;
  }

  async function updatePassword(newPassword) {
    var result = await supabase.auth.updateUser({ password: newPassword });
    if (result.error) throw result.error;
  }

  return (
    <AuthContext.Provider value={{ user: user, teamMember: teamMember, loading: loading, signIn: signIn, signOut: signOut, resetPassword: resetPassword, updatePassword: updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider };
export default useAuth;
