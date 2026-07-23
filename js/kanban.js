document.addEventListener('DOMContentLoaded', () => {
    // 4. Helper function to update counts
    function updateCounts() {
        const columns = document.querySelectorAll('.kanban-column');
        columns.forEach(col => {
            const countEl = col.querySelector('.kanban-col-count');
            const cards = col.querySelectorAll('.kanban-card');
            if (countEl) {
                countEl.textContent = cards.length;
            }
        });
    }

    // Initialize counts on load
    updateCounts();

    // 1. Drag and Drop functionality
    let draggedCard = null;

    // Use event delegation for dynamically added cards
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList && e.target.classList.contains('kanban-card')) {
            draggedCard = e.target;
            e.target.classList.add('dragging');
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', ''); // Required for Firefox
            }
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList && e.target.classList.contains('kanban-card')) {
            e.target.classList.remove('dragging');
            draggedCard = null;
        }
    });

    // 2. Drop zones
    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', (e) => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');
            
            if (draggedCard) {
                // Find where to insert the card (between header and add button)
                const addBtn = column.querySelector('.kanban-add-btn');
                const header = column.querySelector('.kanban-column-header');
                
                // If there's a dedicated wrapper for cards, we'd use it, but fallback to column insertion
                const cardsContainer = column.querySelector('.kanban-cards-container') || column;
                
                if (cardsContainer === column && addBtn) {
                    column.insertBefore(draggedCard, addBtn);
                } else if (cardsContainer !== column) {
                    cardsContainer.appendChild(draggedCard);
                } else {
                    column.appendChild(draggedCard);
                }

                updateCounts();
            }
        });
    });

    // 3. Add task
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('kanban-add-btn') || e.target.closest('.kanban-add-btn')) {
            const btn = e.target.classList.contains('kanban-add-btn') ? e.target : e.target.closest('.kanban-add-btn');
            const column = btn.closest('.kanban-column');
            const taskName = prompt("Enter task name:");
            
            if (taskName && taskName.trim() !== "") {
                const card = document.createElement('div');
                card.className = 'kanban-card';
                card.setAttribute('draggable', 'true');
                
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                
                card.innerHTML = `
                    <div class="kanban-card-chip" style="background: #E0E7FF; color: #4338CA; padding: 2px 8px; border-radius: 12px; font-size: 12px; display: inline-block; margin-bottom: 8px;">New</div>
                    <div class="kanban-card-title" style="font-weight: 500; margin-bottom: 12px;">${taskName.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                    <div class="kanban-card-footer" style="display: flex; justify-content: space-between; align-items: center; color: #6B7280; font-size: 12px;">
                        <div class="kanban-card-date">${dateStr}</div>
                        <div class="kanban-card-avatar" style="width: 24px; height: 24px; background: #D1D5DB; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">U</div>
                    </div>
                `;
                
                const cardsContainer = column.querySelector('.kanban-cards-container') || column;
                
                if (cardsContainer === column && btn) {
                    column.insertBefore(card, btn);
                } else if (cardsContainer !== column) {
                    cardsContainer.appendChild(card);
                } else {
                    column.appendChild(card);
                }

                updateCounts();
            }
        }
    });
});
