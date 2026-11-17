import React, { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Menu, X, ArrowUpRight, Compass, ShieldCheck, Plus, Pencil, Trash2, LogOut, ChevronLeft } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";
const regions = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];
const emptyForm = { name:"", state:"Maharashtra", city:"", category:"Heritage", description:"", bestTime:"October to March", entryFee:"", locationUrl:"", imageUrl:"", nearbyAttractions:"" };

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, { headers: { "Content-Type":"application/json", ...(options.token ? { Authorization:`Bearer ${options.token}` } : {}) }, ...options, token: undefined });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function App() {
  const [places,setPlaces] = useState([]);
  const [search,setSearch] = useState("");
  const [state,setState] = useState("");
  const [category,setCategory] = useState("");
  const [selected,setSelected] = useState(null);
  const [page,setPage] = useState("home");
  const [mobileMenu,setMobileMenu] = useState(false);
  const [token,setToken] = useState(sessionStorage.getItem("tb_token") || "");
  const [login,setLogin] = useState({email:"",password:""});
  const [error,setError] = useState("");
  const [form,setForm] = useState(emptyForm);
  const [editing,setEditing] = useState(null);
  const [saving,setSaving] = useState(false);

  const load = async () => { try { setPlaces(await request("/destinations")); } catch(e) { setError(e.message + " — start the backend and connect MongoDB."); } };
  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => places.filter(p =>
    (!state || p.state === state) && (!category || p.category === category) &&
    (!search || `${p.name} ${p.state} ${p.city} ${p.description}`.toLowerCase().includes(search.toLowerCase()))
  ), [places,search,state,category]);

  const logout = () => { sessionStorage.removeItem("tb_token"); setToken(""); setPage("home"); };
  const signIn = async e => {
    e.preventDefault(); setError("");
    try { const data = await request("/auth/login",{method:"POST",body:JSON.stringify(login)}); sessionStorage.setItem("tb_token",data.token); setToken(data.token); setPage("admin"); }
    catch(e) { setError(e.message); }
  };
  const edit = p => { setEditing(p._id); setForm({...p,nearbyAttractions:(p.nearbyAttractions||[]).join(", ")}); window.scrollTo(0,0); };
  const newPlace = () => { setEditing(null); setForm(emptyForm); };
  const save = async e => {
    e.preventDefault(); setSaving(true); setError("");
    const payload = {...form, nearbyAttractions:form.nearbyAttractions.split(",").map(x=>x.trim()).filter(Boolean)};
    try {
      await request(editing ? `/destinations/${editing}` : "/destinations",{method:editing?"PUT":"POST",body:JSON.stringify(payload),token});
      newPlace(); await load();
    } catch(e) { setError(e.message); } finally { setSaving(false); }
  };
  const remove = async id => { if(!confirm("Delete this destination?")) return; try { await request(`/destinations/${id}`,{method:"DELETE",token}); await load(); } catch(e){setError(e.message);} };

  return <div className="app">
    <header className="navbar"><a className="brand" href="#" onClick={()=>{setPage("home");setSelected(null)}}><span className="brand-mark">T</span><span>Travel<span className="brand-gold">Bharat</span></span></a>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
      <nav className={mobileMenu?"nav-links open":"nav-links"}><a onClick={()=>{setPage("home");setSelected(null);setMobileMenu(false)}}>Explore</a><a href="#regions" onClick={()=>setMobileMenu(false)}>Destinations</a><a onClick={()=>{setPage("admin");setMobileMenu(false)}}>Admin</a></nav>
      <button className="nav-cta" onClick={()=>{setPage("home");document.getElementById("discover")?.scrollIntoView({behavior:"smooth"})}}>Start exploring <ArrowUpRight size={16}/></button>
    </header>

    {page==="login" ? <main className="login-wrap"><form className="login-card" onSubmit={signIn}><span className="eyebrow">ADMIN ACCESS</span><h1>Welcome back</h1><p>Sign in to manage TravelBharat destinations.</p><label>Username or Email<input type="text" required value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} autoComplete="username"/></label><label>Password<input type="password" required value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<button className="primary-btn">Sign in</button></form></main>
    : page==="admin" && !token ? <main className="login-wrap"><form className="login-card" onSubmit={signIn}><span className="eyebrow">ADMIN ACCESS</span><h1>Admin sign in</h1><p>Only authorized administrators can manage destination content.</p><label>Username or Email<input type="text" required value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} autoComplete="username"/></label><label>Password<input type="password" required value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<button className="primary-btn">Sign in</button></form></main>
    : page==="admin" ? <main className="admin-page"><div className="admin-head"><div><span className="eyebrow">CONTENT MANAGEMENT</span><h1>Admin dashboard</h1><p>Manage the destinations shown on TravelBharat.</p></div><button className="outline-btn" onClick={logout}><LogOut size={16}/> Sign out</button></div>
      {error&&<p className="error">{error}</p>}<div className="admin-grid"><form className="editor-card" onSubmit={save}><div className="form-title"><h2>{editing?"Edit destination":"Add destination"}</h2>{editing&&<button type="button" className="text-btn" onClick={newPlace}>Cancel edit</button>}</div>
        <label>Place name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <div className="form-row"><label>State / UT<select value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>{regions.map(x=><option key={x}>{x}</option>)}</select></label><label>City<input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label></div>
        <div className="form-row"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{["Heritage","Nature","Adventure","Religious","Beach","Wildlife","Culture"].map(x=><option key={x}>{x}</option>)}</select></label><label>Best time to visit<input value={form.bestTime} onChange={e=>setForm({...form,bestTime:e.target.value})}/></label></div>
        <label>Description<textarea required rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
        <label>Entry fee / note<input value={form.entryFee} onChange={e=>setForm({...form,entryFee:e.target.value})}/></label>
        <label>Image URL<input value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}/></label>
        <label>Google Maps link<input value={form.locationUrl} onChange={e=>setForm({...form,locationUrl:e.target.value})}/></label>
        <label>Nearby attractions (comma separated)<input value={form.nearbyAttractions} onChange={e=>setForm({...form,nearbyAttractions:e.target.value})}/></label>
        <button className="primary-btn" disabled={saving}>{saving?"Saving…":editing?"Update destination":"Add destination"}</button>
      </form><section className="manage-card"><div className="form-title"><h2>Destinations <span className="count">{places.length}</span></h2></div>{places.map(p=><div className="manage-row" key={p._id}><div><strong>{p.name}</strong><small>{p.city}, {p.state}</small></div><button title="Edit" onClick={()=>edit(p)}><Pencil size={16}/></button><button title="Delete" onClick={()=>remove(p._id)}><Trash2 size={16}/></button></div>)}</section></div></main>
    : selected ? <main className="detail-page"><button className="back-btn" onClick={()=>setSelected(null)}><ChevronLeft size={17}/> Back to destinations</button><div className="detail-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(12,31,28,.82),rgba(12,31,28,.15)),url("${selected.imageUrl||""}")`}}><div><span className="eyebrow light">{selected.category} · {selected.state}</span><h1>{selected.name}</h1><p><MapPin size={17}/> {selected.city}, {selected.state}</p></div></div><div className="detail-content"><article><span className="eyebrow">DISCOVER INDIA</span><h2>About this destination</h2><p>{selected.description}</p><h3>Nearby attractions</h3><ul>{(selected.nearbyAttractions||[]).map(x=><li key={x}>{x}</li>)}</ul></article><aside className="info-card"><h3>Plan your visit</h3><p><b>Best time</b><br/>{selected.bestTime||"Check local conditions"}</p><p><b>Entry fee</b><br/>{selected.entryFee||"Check locally"}</p>{selected.locationUrl&&<a className="primary-btn link-btn" href={selected.locationUrl} target="_blank" rel="noreferrer">View on map <ArrowUpRight size={16}/></a>}</aside></div></main>
    : <><section className="hero"><div className="hero-shade"></div><div className="hero-content"><span className="eyebrow light"><Compass size={15}/> THE SOUL OF INCREDIBLE INDIA</span><h1>Find your next<br/><em>great story.</em></h1><p>From timeless monuments to quiet mountain escapes, discover the places that make India extraordinary.</p><button className="hero-btn" onClick={()=>document.getElementById("discover").scrollIntoView({behavior:"smooth"})}>Explore destinations <ArrowUpRight size={17}/></button></div><div className="hero-note">36 STATES & UNION TERRITORIES <span>·</span> COUNTLESS STORIES</div></section>
      <section className="intro" id="discover"><div><span className="eyebrow">A COUNTRY OF MANY WORLDS</span><h2>India, one destination<br/>at a time.</h2></div><p>Explore India's rich heritage, diverse landscapes and living traditions through a thoughtfully organized travel guide.</p></section>
      <section className="discover-section"><div className="section-head"><div><span className="eyebrow">THE DISCOVERY BEGINS</span><h2>Explore destinations</h2></div><span className="result-count">{filtered.length} places to discover</span></div>
        <div className="filters"><div className="searchbox"><Search size={18}/><input placeholder="Search places, states or cities..." value={search} onChange={e=>setSearch(e.target.value)}/></div><select value={state} onChange={e=>setState(e.target.value)}><option value="">All states & UTs</option>{regions.map(x=><option key={x}>{x}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">All categories</option>{["Heritage","Nature","Adventure","Religious","Beach","Wildlife","Culture"].map(x=><option key={x}>{x}</option>)}</select></div>
        {filtered.length===0?<div className="empty"><Compass size={30}/><h3>No destinations found</h3><p>Try another search or clear your filters.</p><button className="outline-btn" onClick={()=>{setSearch("");setState("");setCategory("")}}>Clear filters</button></div>:<div className="place-grid">{filtered.map((p,i)=><button className="place-card" key={p._id} onClick={()=>setSelected(p)}><div className="place-image" style={{backgroundImage:`url("${p.imageUrl||""}")`}}><span>{p.category}</span></div><div className="place-info"><small><MapPin size={13}/>{p.city}, {p.state}</small><h3>{p.name}</h3><p>{p.description}</p><span className="discover-link">Discover place <ArrowUpRight size={15}/></span></div></button>)}</div>}
      </section>
      <section className="regions-section" id="regions"><div><span className="eyebrow light">ONE NATION, MANY EXPERIENCES</span><h2>Explore all of India</h2><p>Browse destinations across every state and Union Territory.</p></div><div className="region-chips">{regions.map(x=><button key={x} onClick={()=>{setState(x);document.getElementById("discover").scrollIntoView({behavior:"smooth"})}}>{x}<ArrowUpRight size={13}/></button>)}</div></section>
      <section className="trust-strip"><div><ShieldCheck/><span><b>Curated information</b><small>Useful details in one place</small></span></div><div><Compass/><span><b>Discover more</b><small>Popular and lesser-known places</small></span></div><div><MapPin/><span><b>Explore by region</b><small>State and city-wise discovery</small></span></div></section>
    </>}
    <footer><a className="brand" href="#"><span className="brand-mark">T</span><span>Travel<span className="brand-gold">Bharat</span></span></a><p>Discover the extraordinary, across India.</p><small>© {new Date().getFullYear()} TravelBharat. Informational tourism guide.</small></footer>
  </div>;
}
export default App;
