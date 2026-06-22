import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft, Heart, Gift, Camera, Briefcase, Sparkles, Building, Baby } from 'lucide-react';
import { motion } from 'framer-motion';
import './Categories.css';

const Categories = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      const start = sliderRef.current.scrollLeft;
      const target = start + scrollAmount;
      const duration = 250; 
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        sliderRef.current.scrollLeft = start + (target - start) * easeOut;
        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };
      requestAnimationFrame(animateScroll);
    }
  };

  const categories = [
    { name: "Weddings", desc: "Make your big day magical", icon: <Heart size={20} />, img: "/assets/mockup_hero_arch.png" },
    { name: "Engagements", desc: "Celebrate your new beginning", icon: <Sparkles size={20} />, img: "/assets/mockup_category_engagements.png" },
    { name: "Birthdays", desc: "Make birthdays unforgettable", icon: <Gift size={20} />, img: "/assets/mockup_category_birthdays.png" },
    { name: "Anniversaries", desc: "Cherish every milestone", icon: <Camera size={20} />, img: "/assets/mockup_category_anniversaries.png" },
    { name: "Naming Ceremonies", desc: "Beautiful beginnings", icon: <Heart size={20} />, img: "/assets/mockup_category_naming.png" },
    { name: "Baby Showers", desc: "Welcome the little one", icon: <Baby size={20} />, img: "/assets/mockup_category_baby_shower.png" },
    { name: "Corporate Events", desc: "Professional. Impactful.", icon: <Building size={20} />, img: "/assets/category_corporate.png" }
  ];

  return (
    <section className="section categories-section snap-section" id="events">
      <div className="container">
        
        <motion.div 
          className="categories-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <div className="cat-nav left">
            Explore by Event Type <Sparkles size={16} className="text-accent ml-2" />
          </div>
          <div className="cat-title">
            <h2 className="font-serif">Every Celebration, Beautifully Planned</h2>
          </div>
          <div className="cat-nav right">
            <a href="#">View All Events <ArrowRight size={16} className="ml-2" /></a>
          </div>
        </motion.div>

        <motion.div 
          className="categories-slider-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
        >
          <button className="slider-nav-btn prev-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <ArrowLeft size={20} />
          </button>
          
          <div className="categories-slider" ref={sliderRef}>
            {categories.map((cat, index) => (
              <div className="category-card" key={index}>
                <div className="category-img-container">
                  <img src={cat.img} alt={cat.name} className="category-img" />
                </div>
                <div className="category-info">
                  <div className="category-title-row">
                    <div className="category-icon text-accent">{cat.icon}</div>
                    <h4>{cat.name}</h4>
                  </div>
                  <p>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn next-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <ArrowRight size={20} />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Categories;
