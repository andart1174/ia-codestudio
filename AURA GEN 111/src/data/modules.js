export const modules = {
  headers: {
    minimal: {
      en: `<nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>{{BRAND_NAME}}</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '500' }}>
          <span>Products</span><span>Solutions</span><span>Pricing</span>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Get Started</button>
      </nav>`,
      fr: `<nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>{{BRAND_NAME}}</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '500' }}>
          <span>Produits</span><span>Solutions</span><span>Tarifs</span>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Commencer</button>
      </nav>`
    }
  },
  heroes: {
    saas: {
      en: `<section style={{ textAlign: 'center', padding: '120px 20px', background: 'radial-gradient(circle at top, rgba(99,102,241,0.15) 0%, transparent 70%)' }}>
        <h1 style={{ fontSize: '72px', fontWeight: '900', margin: '0 0 24px', lineHeight: '1.1', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale your next<br/>big idea.</h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>Industrial grade infrastructure for {{INDUSTRY}} applications. Built for speed, security, and global scale.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(99,102,241,0.4)' }}>Deploy Now</button>
          <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>View Demo</button>
        </div>
      </section>`,
      fr: `<section style={{ textAlign: 'center', padding: '120px 20px', background: 'radial-gradient(circle at top, rgba(99,102,241,0.15) 0%, transparent 70%)' }}>
        <h1 style={{ fontSize: '72px', fontWeight: '900', margin: '0 0 24px', lineHeight: '1.1', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Propulsez votre<br/>prochaine idee.</h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>Infrastructure de classe industrielle pour les applications de {{INDUSTRY}}. Concu pentru viteza, securitate si scara globala.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(99,102,241,0.4)' }}>Deployer</button>
          <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>Voir Demo</button>
        </div>
      </section>`
    },
    auth: {
      en: `<section style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>Enter your {{BRAND_NAME}} credentials to continue.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" placeholder="Email address" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '10px', color: '#fff' }} />
            <input type="password" placeholder="Password" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '10px', color: '#fff' }} />
            <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '700', fontSize: '16px', marginTop: '10px' }}>Sign In</button>
          </div>
        </div>
      </section>`,
      fr: `<section style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Bon Retour</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>Entrez vos identifiants {{BRAND_NAME}} pentru a continua.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" placeholder="Adresse e-mail" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '10px', color: '#fff' }} />
            <input type="password" placeholder="Mot de passe" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '10px', color: '#fff' }} />
            <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '700', fontSize: '16px', marginTop: '10px' }}>Se Connecter</button>
          </div>
        </div>
      </section>`
    },
    portfolio: {
      en: `<section style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', padding: '100px 60px', alignItems: 'center' }}>
        <div>
          <h4 style={{ color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '14px', marginBottom: '16px' }}>Available for hire</h4>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: '0 0 24px', lineHeight: '1.2' }}>Hi, I'm {{BRAND_NAME}}.</h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '40px' }}>Creative director and frontend architect specializing in {{INDUSTRY}} experiences and high-fidelity digital products.</p>
          <button style={{ background: '#fff', color: '#000', border: 'none', padding: '16px 40px', borderRadius: '50px', fontWeight: '800' }}>Say Hello</button>
        </div>
        <div style={{ height: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px' }}>🎨</div>
        </div>
      </section>`,
      fr: `<section style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', padding: '100px 60px', alignItems: 'center' }}>
        <div>
          <h4 style={{ color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '14px', marginBottom: '16px' }}>Disponible</h4>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: '0 0 24px', lineHeight: '1.2' }}>Salut, je suis {{BRAND_NAME}}.</h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '40px' }}>Directeur de creation si arhitect frontend specializat in experiente {{INDUSTRY}} si produse digitale.</p>
          <button style={{ background: '#fff', color: '#000', border: 'none', padding: '16px 40px', borderRadius: '50px', fontWeight: '800' }}>Dire Hello</button>
        </div>
        <div style={{ height: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px' }}>🎨</div>
        </div>
      </section>`
    }
  },
  features: {
    grid: {
      en: `<section style={{ padding: '80px 60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px' }}>
            <div style={{ width: '48px', height: '48px', background: '#6366f1', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', margin: '0 0 12px', color: '#fff' }}>Feature {i}</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>High performance system analytics for deep learning and neural network processing.</p>
          </div>
        ))}
      </section>`,
      fr: `<section style={{ padding: '80px 60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px' }}>
            <div style={{ width: '48px', height: '48px', background: '#6366f1', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', margin: '0 0 12px', color: '#fff' }}>Fonction {i}</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Analyses de systeme haute performance pentru procesarea invatarii profunde.</p>
          </div>
        ))}
      </section>`
    }
  },
  pricing: {
    modern: {
      en: `<section style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '60px' }}>Transparent Pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {['Free', 'Pro', 'Enterprise'].map((tier, i) => (
            <div key={tier} style={{ background: i === 1 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid ' + (i === 1 ? '#6366f1' : 'rgba(255,255,255,0.1)'), padding: '40px', borderRadius: '32px', textAlign: 'left' }}>
              <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', color: i === 1 ? '#6366f1' : '#94a3b8' }}>{tier}</h4>
              <div style={{ fontSize: '48px', fontWeight: '900', margin: '20px 0' }}>\${i * 49}<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                <li>✔ Custom {{BRAND_NAME}} APIs</li>
                <li>✔ 24/7 Priority Support</li>
                <li>✔ Advanced Encryption</li>
              </ul>
              <button style={{ width: '100%', padding: '14px', borderRadius: '12px', background: i === 1 ? '#6366f1' : 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', fontWeight: '700' }}>Choose {tier}</button>
            </div>
          ))}
        </div>
      </section>`,
      fr: `<section style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '60px' }}>Tarifs Transparents</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {['Gratuit', 'Pro', 'Entreprise'].map((tier, i) => (
            <div key={tier} style={{ background: i === 1 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', border: '1px solid ' + (i === 1 ? '#6366f1' : 'rgba(255,255,255,0.1)'), padding: '40px', borderRadius: '32px', textAlign: 'left' }}>
              <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', color: i === 1 ? '#6366f1' : '#94a3b8' }}>{tier}</h4>
              <div style={{ fontSize: '48px', fontWeight: '900', margin: '20px 0' }}>{i * 49}€<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mois</span></div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                <li>✔ APIs {{BRAND_NAME}} personnalisees</li>
                <li>✔ Support Prioritaire 24/7</li>
                <li>✔ Cryptage Avance</li>
              </ul>
              <button style={{ width: '100%', padding: '14px', borderRadius: '12px', background: i === 1 ? '#6366f1' : 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', fontWeight: '700' }}>Choisir {tier}</button>
            </div>
          ))}
        </div>
      </section>`
    }
  },
  footers: {
    minimal: {
      en: `<footer style={{ padding: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>© 2026 {{BRAND_NAME}}. Built with AuraGen Engine.</p>
      </footer>`,
      fr: `<footer style={{ padding: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>© 2026 {{BRAND_NAME}}. Construit avec AuraGen Engine.</p>
      </footer>`
    }
  }
};
