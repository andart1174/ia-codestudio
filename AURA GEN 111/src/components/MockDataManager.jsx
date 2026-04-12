import React, { useState } from 'react';
import { Database, Wand2, Copy, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MOCK_TEMPLATES = {
    products: {
        label: 'Products', labelFr: 'Produits', icon: '🛍️',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['Smart Watch Pro', 'Wireless Earbuds', 'Laptop Stand', 'Mechanical Keyboard', 'USB-C Hub', 'Webcam 4K', 'Desk Lamp LED', 'Mouse Pad XL'][i % 8],
            price: (29 + i * 17).toFixed(2),
            category: ['Electronics', 'Audio', 'Accessories', 'Peripherals'][i % 4],
            rating: (3.5 + (i % 3) * 0.5).toFixed(1),
            inStock: i % 4 !== 3,
            image: `https://images.unsplash.com/photo-${['1523275335684-37898b6baf30','1572635196237-14b3f281503f','1593642632559-0c6d3fc62b89','1587829741301-dc798b82a2f0','1491933382734-91922175b0a4'][i % 5]}?w=400&q=80`,
        })),
        codeTemplate: (data) => `const products = ${JSON.stringify(data, null, 2)};`,
    },
    users: {
        label: 'Users', labelFr: 'Utilisateurs', icon: '👥',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['Alice Martin', 'Bob Chen', 'Claire Dubois', 'David Kim', 'Emma Wilson', 'François Petit', 'Grace Lee', 'Hiro Tanaka'][i % 8],
            email: ['alice', 'bob', 'claire', 'david', 'emma', 'francois', 'grace', 'hiro'][i % 8] + '@example.com',
            role: ['Admin', 'Editor', 'Viewer', 'Manager'][i % 4],
            avatar: `https://images.unsplash.com/photo-${['1494790108377-be9c29b29330','1506794778202-cad84cf45f1d','1544005313-94ddf0286df2','1472099645785-5658abf4ff4e'][i % 4]}?w=100&q=80`,
            status: i % 3 === 0 ? 'inactive' : 'active',
            joined: `${['Jan','Feb','Mar','Apr','May','Jun'][i % 6]} 202${5 + (i % 2)}`,
        })),
        codeTemplate: (data) => `const users = ${JSON.stringify(data, null, 2)};`,
    },
    articles: {
        label: 'Blog Articles', labelFr: 'Articles Blog', icon: '📝',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['The Future of AI Interfaces', 'Building Scalable APIs', 'Design Systems in 2026', 'React Performance Tips', 'CSS Grid Mastery', 'TypeScript Best Practices', 'Web3 & the New Internet', 'Microservices Architecture'][i % 8],
            author: ['Alice Martin', 'Bob Chen', 'Claire Dubois', 'David Kim'][i % 4],
            date: `April ${i + 1}, 2026`,
            readTime: `${3 + i} min read`,
            category: ['Technology', 'Design', 'Development', 'Career'][i % 4],
            likes: 120 + i * 34,
            excerpt: 'A deep-dive into modern development patterns and best practices for building better digital products.',
        })),
        codeTemplate: (data) => `const articles = ${JSON.stringify(data, null, 2)};`,
    },
    orders: {
        label: 'Orders', labelFr: 'Commandes', icon: '📦',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: `ORD-${1000 + i}`,
            customer: ['Alice Martin', 'Bob Chen', 'Claire Dubois', 'David Kim', 'Emma Wilson'][i % 5],
            product: ['Smart Watch Pro', 'Wireless Earbuds', 'Laptop Stand', 'Keyboard', 'USB Hub'][i % 5],
            amount: `$${(49.99 + i * 23.5).toFixed(2)}`,
            status: ['Delivered', 'Processing', 'Shipped', 'Cancelled', 'Pending'][i % 5],
            date: `2026-04-${String(i + 1).padStart(2, '0')}`,
            paymentMethod: ['Credit Card', 'PayPal', 'Crypto', 'Bank Transfer'][i % 4],
        })),
        codeTemplate: (data) => `const orders = ${JSON.stringify(data, null, 2)};`,
    },
    employees: {
        label: 'Employees', labelFr: 'Employés', icon: '🧑‍💼',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['James Smith', 'Maria Garcia', 'Liam Johnson', 'Sophia Brown', 'Olivia Davis', 'Noah Wilson', 'Emma Taylor', 'Ava Thomas'][i % 8],
            department: ['Engineering', 'Marketing', 'Design', 'Sales', 'HR', 'Finance'][i % 6],
            position: ['Senior Dev', 'UX Designer', 'Product Manager', 'Data Analyst', 'DevOps Engineer', 'Marketing Lead'][i % 6],
            salary: `$${(65000 + i * 8500).toLocaleString()}`,
            experience: `${2 + i} years`,
            location: ['New York', 'Paris', 'London', 'Tokyo', 'Berlin', 'Dubai'][i % 6],
            performance: ['Excellent', 'Good', 'Average', 'Excellent', 'Good'][i % 5],
        })),
        codeTemplate: (data) => `const employees = ${JSON.stringify(data, null, 2)};`,
    },
    movies: {
        label: 'Movies', labelFr: 'Films', icon: '🎬',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['Interstellar', 'The Matrix', 'Inception', 'Dune Part II', 'Blade Runner 2049', 'Ex Machina', 'Avatar', 'Oppenheimer'][i % 8],
            director: ['Christopher Nolan', 'Denis Villeneuve', 'Ridley Scott', 'James Cameron', 'Alex Garland'][i % 5],
            genre: ['Sci-Fi', 'Action', 'Thriller', 'Drama', 'Mystery'][i % 5],
            year: 2015 + (i % 10),
            rating: (7.5 + (i % 5) * 0.3).toFixed(1),
            duration: `${1 + (i % 2)}h ${30 + (i * 7) % 30}m`,
            language: ['English', 'French', 'Spanish', 'Japanese'][i % 4],
            poster: `https://images.unsplash.com/photo-${['1489599849927-2ee91cede3ba','1536440136628-849c177e76a1','1440404653325-ab127d49abc1','1594909122845-11baa439b7bf'][i % 4]}?w=300&q=80`,
        })),
        codeTemplate: (data) => `const movies = ${JSON.stringify(data, null, 2)};`,
    },
    recipes: {
        label: 'Recipes', labelFr: 'Recettes', icon: '🍽️',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['Pasta Carbonara', 'Chicken Tikka Masala', 'Sushi Rolls', 'Beef Bourguignon', 'Caesar Salad', 'Avocado Toast', 'Greek Moussaka', 'Tom Yum Soup'][i % 8],
            cuisine: ['Italian', 'Indian', 'Japanese', 'French', 'American', 'Greek', 'Thai'][i % 7],
            prepTime: `${10 + i * 5} min`,
            calories: 300 + i * 75,
            difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
            servings: 2 + (i % 4),
            ingredients: 5 + (i % 6),
            rating: (4.0 + (i % 5) * 0.2).toFixed(1),
        })),
        codeTemplate: (data) => `const recipes = ${JSON.stringify(data, null, 2)};`,
    },
    crypto: {
        label: 'Crypto', labelFr: 'Cryptos', icon: '₿',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            rank: i + 1,
            name: ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'BNB', 'XRP', 'Polkadot', 'Avalanche', 'Chainlink', 'Litecoin'][i % 10],
            symbol: ['BTC', 'ETH', 'SOL', 'ADA', 'BNB', 'XRP', 'DOT', 'AVAX', 'LINK', 'LTC'][i % 10],
            price: `$${(67000 / (1 + i * 1.8)).toFixed(2)}`,
            change24h: `${i % 2 === 0 ? '+' : '-'}${(1.2 + i * 0.7).toFixed(2)}%`,
            marketCap: `$${Math.max(0.1, (1.2 - i * 0.1)).toFixed(1)}T`,
            volume24h: `$${Math.max(1, 48 - i * 4).toFixed(0)}B`,
            allTimeHigh: `$${(70000 / (1 + i * 1.5)).toFixed(0)}`,
        })),
        codeTemplate: (data) => `const cryptoData = ${JSON.stringify(data, null, 2)};`,
    },
    weather: {
        label: 'Weather', labelFr: 'Météo', icon: '🌤️',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            city: ['Paris', 'New York', 'Tokyo', 'London', 'Dubai', 'Sydney', 'Berlin', 'Toronto', 'Mumbai', 'São Paulo'][i % 10],
            country: ['France', 'USA', 'Japan', 'UK', 'UAE', 'Australia', 'Germany', 'Canada', 'India', 'Brazil'][i % 10],
            tempC: 10 + (i * 4) % 30,
            tempF: Math.round((10 + (i * 4) % 30) * 9 / 5 + 32),
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Snowy', 'Partly Cloudy', 'Thunderstorm', 'Foggy'][i % 8],
            humidity: `${40 + (i * 7) % 50}%`,
            windKph: 8 + (i * 5) % 40,
            uvIndex: 1 + (i % 11),
        })),
        codeTemplate: (data) => `const weatherData = ${JSON.stringify(data, null, 2)};`,
    },
    tasks: {
        label: 'Tasks / Kanban', labelFr: 'Tâches / Kanban', icon: '✅',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['Design landing page', 'Fix auth bug', 'Write unit tests', 'Update API docs', 'Deploy to staging', 'Code review PR #42', 'Optimize DB queries', 'Set up CI/CD', 'User interviews', 'Refactor navbar'][i % 10],
            status: ['Todo', 'In Progress', 'In Review', 'Done'][i % 4],
            priority: ['Low', 'Medium', 'High', 'Critical'][i % 4],
            assignee: ['Alice', 'Bob', 'Claire', 'David', 'Emma'][i % 5],
            dueDate: `Apr ${i + 5}, 2026`,
            tags: [['UI', 'Frontend'], ['Bug', 'Backend'], ['Testing'], ['Docs'], ['DevOps']][i % 5],
            storyPoints: [1, 2, 3, 5, 8][i % 5],
        })),
        codeTemplate: (data) => `const tasks = ${JSON.stringify(data, null, 2)};`,
    },
    courses: {
        label: 'Courses', labelFr: 'Cours', icon: '🎓',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['React Mastery 2026', 'Full-Stack with Node', 'UI/UX Fundamentals', 'Python for AI', 'AWS Cloud Architect', 'GraphQL Deep Dive', 'TypeScript Essentials', 'Docker & Kubernetes'][i % 8],
            instructor: ['Sarah Kim', 'Max Müller', 'Priya Nair', 'James Brooks', 'Léa Dupont'][i % 5],
            price: `$${[29, 49, 79, 99, 19, 0][i % 6]}`,
            duration: `${8 + i * 3}h`,
            lessons: 20 + i * 5,
            students: `${(1.2 + i * 0.8).toFixed(1)}k`,
            rating: (4.3 + (i % 4) * 0.15).toFixed(1),
            level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
            category: ['Web Dev', 'Design', 'Data', 'Cloud', 'Mobile'][i % 5],
        })),
        codeTemplate: (data) => `const courses = ${JSON.stringify(data, null, 2)};`,
    },
    restaurants: {
        label: 'Restaurants', labelFr: 'Restaurants', icon: '🍕',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['The Golden Fork', 'Sakura Garden', 'La Belle Époque', 'Spice Route', 'The Urban Grill', 'Blue Lagoon Seafood', 'Pasta Paradiso', 'Sushi Zen'][i % 8],
            cuisine: ['American', 'Japanese', 'French', 'Indian', 'BBQ', 'Seafood', 'Italian', 'Fusion'][i % 8],
            rating: (3.8 + (i % 5) * 0.3).toFixed(1),
            priceRange: ['$', '$$', '$$$', '$$$$'][i % 4],
            deliveryTime: `${20 + i * 5} min`,
            minOrder: `$${10 + i * 3}`,
            isOpen: i % 4 !== 3,
            address: `${100 + i * 12} Main Street`,
        })),
        codeTemplate: (data) => `const restaurants = ${JSON.stringify(data, null, 2)};`,
    },
    events: {
        label: 'Events', labelFr: 'Événements', icon: '📅',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['React World Summit', 'Design Conf 2026', 'AI & Future Tech', 'StartupFest', 'Dev Bootcamp', 'UX Workshop', 'Blockchain Forum', 'Open Source Day'][i % 8],
            date: `2026-0${4 + (i % 6)}-${String(i + 1).padStart(2, '0')}`,
            time: `${10 + (i % 8)}:00 AM`,
            location: ['San Francisco', 'Paris', 'Berlin', 'Tokyo', 'London', 'Dubai'][i % 6],
            type: ['Conference', 'Workshop', 'Webinar', 'Meetup', 'Hackathon'][i % 5],
            seats: 50 + i * 25,
            price: i % 3 === 0 ? 'Free' : `$${49 + i * 30}`,
            speaker: ['Elon Musk', 'Sundar Pichai', 'Jensen Huang', 'Sam Altman', 'Mark Zuckerberg'][i % 5],
        })),
        codeTemplate: (data) => `const events = ${JSON.stringify(data, null, 2)};`,
    },
    countries: {
        label: 'Countries', labelFr: 'Pays', icon: '🌍',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            name: ['France', 'United States', 'Japan', 'Germany', 'Brazil', 'India', 'Canada', 'Australia', 'South Korea', 'Italy'][i % 10],
            code: ['FR', 'US', 'JP', 'DE', 'BR', 'IN', 'CA', 'AU', 'KR', 'IT'][i % 10],
            capital: ['Paris', 'Washington DC', 'Tokyo', 'Berlin', 'Brasília', 'New Delhi', 'Ottawa', 'Canberra', 'Seoul', 'Rome'][i % 10],
            population: `${(67 + i * 130).toFixed(0)}M`,
            gdp: `$${(2.7 + i * 3.1).toFixed(1)}T`,
            continent: ['Europe', 'Americas', 'Asia', 'Europe', 'Americas', 'Asia', 'Americas', 'Oceania', 'Asia', 'Europe'][i % 10],
            currency: ['EUR', 'USD', 'JPY', 'EUR', 'BRL', 'INR', 'CAD', 'AUD', 'KRW', 'EUR'][i % 10],
        })),
        codeTemplate: (data) => `const countries = ${JSON.stringify(data, null, 2)};`,
    },
    realestate: {
        label: 'Real Estate', labelFr: 'Immobilier', icon: '🏠',
        generate: (n) => Array.from({ length: n }, (_, i) => ({
            id: i + 1,
            title: ['Modern Penthouse', 'Cozy Studio Apt', 'Family Villa', 'Beachfront Condo', 'Mountain Cabin', 'City Loft', 'Suburban Home', 'Luxury Mansion'][i % 8],
            type: ['Apartment', 'House', 'Villa', 'Condo', 'Studio', 'Loft'][i % 6],
            price: `$${(250 + i * 175).toFixed(0)}k`,
            bedrooms: 1 + (i % 5),
            bathrooms: 1 + (i % 3),
            area: `${60 + i * 35}m²`,
            location: ['Miami Beach', 'Manhattan', 'Beverly Hills', 'Austin TX', 'Chicago', 'Seattle', 'Boston', 'Las Vegas'][i % 8],
            status: ['For Sale', 'For Rent', 'Sold', 'For Sale'][i % 4],
            yearBuilt: 1985 + i * 4,
            image: `https://images.unsplash.com/photo-${['1512917774080-9991f1c4c750','1568605114967-8130f3a36994','1580587771525-78b9dba3b914','1558618666-fcd25c85cd64'][i % 4]}?w=400&q=80`,
        })),
        codeTemplate: (data) => `const properties = ${JSON.stringify(data, null, 2)};`,
    },
};

const MockDataManager = ({ onInjectData }) => {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState('products');
    const [count, setCount] = useState(5);
    const [preview, setPreview] = useState(null);
    const [copied, setCopied] = useState(false);

    const isFr = i18n.language.startsWith('fr');

    const handleGenerate = () => {
        const tpl = MOCK_TEMPLATES[selected];
        const data = tpl.generate(count);
        const code = tpl.codeTemplate(data);
        setPreview({ data, code });
    };

    const handleInject = () => {
        if (preview) {
            onInjectData(preview.code);
        }
    };

    const handleCopy = () => {
        if (preview) {
            navigator.clipboard.writeText(preview.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header */}
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#10b981', textAlign: 'center' }}>
                <Database size={14} style={{ display: 'inline', marginRight: '6px' }} />
                {isFr ? 'Générez de vraies données pour votre app' : 'Generate real data for your app'}
            </div>

            {/* Dataset Type Selector */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
                    {isFr ? 'Type de données' : 'Data Type'}
                </label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {Object.entries(MOCK_TEMPLATES).map(([key, tpl]) => (
                        <button
                            key={key}
                            onClick={() => { setSelected(key); setPreview(null); }}
                            style={{
                                padding: '7px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                                background: selected === key ? 'var(--primary)' : 'var(--glass-bg)',
                                color: selected === key ? '#fff' : 'var(--text-muted)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tpl.icon} {isFr ? tpl.labelFr : tpl.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Count Slider */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{isFr ? "Nombre d'entrées" : 'Number of entries'}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{count}</span>
                </label>
                <input
                    type="range" min="2" max="10" value={count}
                    onChange={(e) => { setCount(Number(e.target.value)); setPreview(null); }}
                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}
            >
                <Wand2 size={15} />
                {isFr ? 'Générer les données' : 'Generate Data'}
            </button>

            {/* Preview */}
            {preview && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                        {isFr ? 'Aperçu' : 'Preview'} ({preview.data.length} {isFr ? 'entrées' : 'entries'})
                    </label>
                    <div style={{
                        background: '#0f172a', borderRadius: '10px', padding: '12px',
                        fontSize: '11px', fontFamily: 'monospace', color: '#7dd3fc',
                        maxHeight: '160px', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                    }}>
                        {preview.code.substring(0, 400)}{preview.code.length > 400 ? '\n...' : ''}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={handleCopy}
                            style={{ flex: 1, padding: '10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                            <Copy size={13} />
                            {copied ? (isFr ? 'Copié!' : 'Copied!') : (isFr ? 'Copier' : 'Copy')}
                        </button>
                        <button
                            onClick={handleInject}
                            style={{ flex: 1, padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                            <Play size={13} />
                            {isFr ? 'Injecter' : 'Inject'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockDataManager;
