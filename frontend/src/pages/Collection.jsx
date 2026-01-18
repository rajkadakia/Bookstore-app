import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const CollectionCard = ({ title, image, size = "normal", delay = 0, id }) => {
  return (
    <div id={id} className={`collection-card position-relative overflow-hidden rounded-4 shadow-sm h-100`} style={{ animationDelay: `${delay}ms` }}>
      <img 
        src={image} 
        alt={title}
        className="w-100 h-100 object-fit-cover transition-transform"
        style={{ transition: 'transform 0.8s ease' }}
      />
      {/* Gradient Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
           style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(62, 39, 35, 0.8) 100%)' }}>
      </div>
      
      {/* Content */}
      <div className="position-absolute bottom-0 start-0 p-4 w-100">
        <h3 className={`font-serif fw-bold mb-3 ${size === 'large' ? 'display-6' : 'h4'}`} style={{ color: '#F9F5F0' }}>{title}</h3>
        <button className="btn btn-outline-light rounded-pill custom-btn-sm fw-semibold d-flex align-items-center gap-2" style={{ borderColor: '#F9F5F0', color: '#F9F5F0' }}>
          Read more <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Collection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="container py-5 mt-5">
      {/* Header */}
      <div className="text-center mb-5 fade-in-up">
        <h1 className="display-4 font-serif fw-bold text-coffee mb-3">Get Inspired</h1>
        <p className="lead text-muted fst-italic">Explore our curated collections for every mood.</p>
      </div>

      {/* Magazine Grid Layout */}
      <div className="row g-4 mb-4">
        {/* Top Left - Large: Best Sellers */}
        <div className="col-lg-7 fade-in-up">
          <div style={{ height: '350px' }}>
            <CollectionCard 
              id="best-seller"
              title="Best Books of This Month" 
              image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200"
              size="large"
              delay={0}
            />
          </div>
        </div>
        
        {/* Top Right - Large: New Arrivals */}
        <div className="col-lg-5 fade-in-up">
          <div style={{ height: '350px' }}>
            <CollectionCard 
              id="new-arrivals"
              title="Fresh New Arrivals" 
            image="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=800"
            delay={100}
          />
        </div>
      </div>
      </div>

      <div className="row g-4">
        {/* Bottom Left - Wide: Award Winners */}
        <div className="col-lg-4 col-md-6 fade-in-up">
           <div style={{ height: '350px' }}>
             <CollectionCard 
              id="award-winners"
              title="Award Winners" 
              image="https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800"
              delay={200}
            />
           </div>
        </div>

        {/* Bottom Mid - Small: Box Sets */}
        <div className="col-lg-4 col-md-6 fade-in-up">
           <div style={{ height: '350px' }}>
             <CollectionCard 
              id="box-sets"
              title="Complete Box Sets" 
              image="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
              delay={300}
            />
           </div>
        </div>

        {/* Bottom Right - Small: International */}
        <div className="col-lg-4 col-md-12 fade-in-up">
           <div style={{ height: '350px' }}>
             <CollectionCard 
              id="international"
              title="International Reads" 
              image="https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?auto=format&fit=crop&q=80&w=800"
              delay={400}
            />
           </div>
        </div>
      </div>
      
      {/* Footer Quote */}
      <div className="text-center mt-5 pt-5 border-top border-opacity-10 opacity-75">
         <BookOpen size={32} className="text-coffee mb-3 opacity-50" />
         <p className="font-serif fst-italic fs-5 text-muted">"A room without books is like a body without a soul."</p>
      </div>
    </div>
  );
};

export default Collection;
