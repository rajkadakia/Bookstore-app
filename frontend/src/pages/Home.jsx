import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { ArrowRight, BookOpen, Coffee, Feather, Trophy, Award, Package, Globe, Sparkles, Smile, Zap, Book, Plus } from 'lucide-react';

const CategoryIcon = ({ icon: Icon, label, to }) => (
  <Link to={to} className="text-decoration-none" style={{ color: 'var(--text-coffee)' }}>
    <div className="d-flex flex-column align-items-center justify-content-center mx-3 my-2 text-center" style={{ minWidth: '80px', cursor: 'pointer' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mb-2" 
           style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-dark-beige)', color: 'var(--text-coffee)' }}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <span className="small fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', color: 'inherit' }}>{label}</span>
    </div>
  </Link>
);

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const banners = [
    {
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200&h=400', 
      title: 'Summer Reading Sale',
      text: 'Up to 50% off on all bestsellers.'
    },
    {
      img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200&h=400',
      title: 'New Collection',
      text: 'Discover the latest releases this month.'
    },
    {
      img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200&h=400',
      title: 'Member Exclusives',
      text: 'Join today and get exclusive member rewards.'
    },
    {
      img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200&h=400',
      title: 'Cozy Classics',
      text: 'Revisit the timeless stories you love.'
    },
    {
      img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1200&h=400', 
      title: 'Gift Guides',
      text: 'Perfect presents for the bookworms in your life.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="w-100 position-relative overflow-hidden rounded-4 shadow-sm mb-5" style={{ height: '300px' }}>
      <div 
        className="d-flex transition-transform" 
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          height: '100%'
        }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-100 flex-shrink-0" style={{ height: '100%', position: 'relative' }}>
             <img 
               src={banner.img} 
               alt={banner.title} 
               className="w-100 h-100" 
               style={{ objectFit: 'cover' }} 
             />

             <div className="position-absolute top-0 start-0 w-100 h-100" 
                  style={{ background: 'linear-gradient(90deg, rgba(62, 39, 35, 0.95) 0%, rgba(62, 39, 35, 0.5) 50%, rgba(62, 39, 35, 0) 100%)' }}>
             </div>
             

             <div className="position-absolute top-50 start-0 translate-middle-y ps-5 text-white" style={{ maxWidth: '600px', zIndex: 2 }}>
                <h2 className="display-4 font-serif fw-bold mb-2 text-shadow" style={{ color: '#F9F5F0' }}>{banner.title}</h2>
                <p className="lead font-serif fst-italic opacity-100 text-shadow-sm" style={{ fontWeight: 300, color: '#E6DCCD' }}>{banner.text}</p>
                <button className="btn btn-outline-light rounded-pill px-4 py-2 mt-3 fw-semibold" style={{ borderColor: '#F9F5F0', color: '#F9F5F0' }}>Shop Now</button>
             </div>
          </div>
        ))}
      </div>
      

      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2" style={{ zIndex: 3 }}>
        {banners.map((_, idx) => (
          <button 
            key={idx}
            className={`rounded-circle border-0 p-0 ${currentIndex === idx ? 'bg-white' : 'bg-white opacity-50'}`}
            style={{ width: '10px', height: '10px', transition: 'all 0.3s' }}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/books${searchQuery ? `?search=${searchQuery}` : ''}`);
        const booksData = response.data.data || (Array.isArray(response.data) ? response.data : []);
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  return (
    <div className="home-container" style={{ paddingBottom: '100px' }}>

      <section className="text-center py-5 mb-4">
        <div className="container">
          <BookOpen strokeWidth={1} size={48} className="text-coffee mb-3 opacity-50" />
          <h1 className="display-4 font-serif text-coffee mb-2">My Bookshelf</h1>
          <p className="text-muted lead font-serif fst-italic">"Just one more chapter..."</p>
        </div>
      </section>


      <section className="container mb-5">

        <div className="d-flex flex-wrap justify-content-center justify-content-lg-between mb-5 py-3 border-top border-bottom" style={{ borderColor: 'var(--bg-dark-beige)' }}>
          <CategoryIcon icon={Trophy} label="Best Seller" to="/books#best-seller" />
          <CategoryIcon icon={Award} label="Award Winners" to="/books#award-winners" />
          <CategoryIcon icon={Package} label="Box Sets" to="/books#box-sets" />
          <CategoryIcon icon={Globe} label="International" to="/books#international" />
          <CategoryIcon icon={Sparkles} label="New Arrivals" to="/books#new-arrivals" />
        </div>


        <FeaturedCarousel />
      </section>


      <section className="container">
        {loading ? (
           <div className="text-center py-5">
             <div className="spinner-border text-coffee opacity-25" role="status"></div>
             <p className="mt-2 text-muted small font-serif">Dusting off the covers...</p>
           </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {books.length > 0 ? (
               books.map((book) => (
                 <ShelfItem key={book._id} book={book} />
               ))
            ) : (
               <div className="col-12 text-center py-5 text-muted fst-italic">
                 The library is currently empty.
               </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};


const ShelfItem = ({ book }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart(book);
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-5 px-3 group">
      <div className="book-container-3d text-center position-relative mx-auto" style={{ maxWidth: '160px' }}>
        <Link to={`/books/${book._id}`}>
          {!imgError ? (
            <img 
              src={book.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'} 
              alt={book.title}
              className="rounded-1 mb-0 book-img-3d w-100"
              style={{ aspectRatio: '2/3', objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300"
              alt={book.title}
              className="rounded-1 mb-0 book-img-3d w-100"
              style={{ aspectRatio: '2/3', objectFit: 'cover' }}
            />
          )}
        </Link>
        

        <button 
           className="btn btn-sm position-absolute bottom-0 end-0 mb-3 me-n2 d-flex align-items-center justify-content-center shadow-sm"
           onClick={handleAddToCart}
           style={{ 
             width: '42px', 
             height: '42px', 
             borderRadius: '50%',
             padding: 0,
             zIndex: 10,
             backgroundColor: '#E6DCCD', 
             color: '#4E342E',
             border: '3px solid #F9F5F0'
           }}
           title="Add to Cart"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>


      <div className="rustic-wood-shelf mx-auto" style={{ maxWidth: '90%' }}></div>
      

      <div className="pt-3 text-center">
        <h3 className="h6 font-serif fw-bold text-coffee mb-2 text-truncate px-1" style={{ letterSpacing: '0.5px' }}>{book.title}</h3>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <div className="price-tag-rustic">
            ₹{book.price ? Number(book.price).toFixed(2) : '399.00'}
          </div>
          <div className="d-flex align-items-center text-mocha small">
            <BookOpen size={14} className="me-1 opacity-75" />
            <span className="fw-bold">{book.averageRating || '0.0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

