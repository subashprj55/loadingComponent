document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.loading-card');
    let currentIndex = 1;
    let isDragging = false;
    let startY = 0, currentY = 0;
    const dragThreshold = 50;

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('pre', 'active', 'next');
            card.style.transition = 'transform 0.8s ease'; 

            if (index === currentIndex) {
                card.classList.add('active');
                card.style.transform = 'translateY(0) scale(1.3)';
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('pre');
                card.style.transform = 'translateY(-100%)'; 
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
                card.style.transform = 'translateY(100%)'; 
            } else {
                card.style.transform = 'translateY(0)'; 
            }
        });

        attachDragListeners(); 
    }

    function attachDragListeners() {
        cards.forEach((card) => {
            card.onmousedown = null;
        });

        const activeCard = cards[currentIndex];
        activeCard.onmousedown = (e) => {
            isDragging = true;
            startY = e.clientY; 
            currentY = startY; 
            activeCard.style.transition = 'none';
        };

        document.onmousemove = (e) => {
            if (!isDragging) return;
            currentY = e.clientY;
            const moveY = currentY - startY; 
            activeCard.style.transform = `translateY(${moveY}px) scale(1.3)`; 
        };

        document.onmouseup = () => {
            if (isDragging) {
                isDragging = false;
                const moveY = currentY - startY;
     
                if (Math.abs(moveY) > dragThreshold) {    
                    if (moveY < -dragThreshold) {
                        currentIndex = (currentIndex + 1) % cards.length; 
                    }
                    else if (moveY > dragThreshold) {
                        currentIndex = (currentIndex - 1 + cards.length) % cards.length; 
                    }
                } else {
                    activeCard.style.transform = `translateY(0) scale(1.3)`;
                }
                updateCards(); 
            }
        };
    }
    updateCards();
});
