// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize price trends chart
    initPriceChart();
    
    // Initialize event listeners
    initEventListeners();
    
    // Simulate loading notices from a database
    loadSampleNotices();
});

// Initialize the price trends chart
function initPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Data for Sydney apartment price trends
    const years = ['2023', '2024', '2025', '2026 (Projected)', '2027 (Projected)', '2028 (Projected)', '2029 (Projected)'];
    const apartmentPrices = [750000, 790000, 830000, 880000, 935000, 985000, 1040000];
    const housePrices = [1400000, 1480000, 1560000, 1680000, 1790000, 1900000, 2010000];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Apartment Median Price (AUD)',
                    data: apartmentPrices,
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderWidth: 3,
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'House Median Price (AUD)',
                    data: housePrices,
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    borderWidth: 3,
                    tension: 0.2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sydney Property Price Trends and Projections',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-AU', { 
                                    style: 'currency', 
                                    currency: 'AUD',
                                    maximumFractionDigits: 0
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (AUD)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-AU');
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Initialize event listeners for interactive elements
function initEventListeners() {
    // Login button
    document.getElementById('login-btn').addEventListener('click', function() {
        alert('Login functionality would be implemented here.');
    });
    
    // Register button
    document.getElementById('register-btn').addEventListener('click', function() {
        alert('Registration functionality would be implemented here.');
    });
    
    // Post notice button
    document.getElementById('post-notice-btn').addEventListener('click', function() {
        showNoticeForm();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav .nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Show notice submission form
function showNoticeForm() {
    // Create modal for notice submission (simplified version)
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'noticeModal';
    modal.setAttribute('tabindex', '-1');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Post a Notice</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="notice-form">
                        <div class="mb-3">
                            <label for="notice-title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="notice-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="notice-content" class="form-label">Content</label>
                            <textarea class="form-control" id="notice-content" rows="4" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="notice-contact" class="form-label">Contact Information (Optional)</label>
                            <input type="text" class="form-control" id="notice-contact">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="submit-notice">Submit Notice</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize and show the modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Handle notice submission
    document.getElementById('submit-notice').addEventListener('click', function() {
        const title = document.getElementById('notice-title').value;
        const content = document.getElementById('notice-content').value;
        
        if (title && content) {
            // In a real application, this would send data to a server
            alert('Notice submission functionality would be implemented here.');
            modalInstance.hide();
            
            // Remove modal from DOM after hiding
            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
            });
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Load sample notices (in a real app, this would fetch from a database)
function loadSampleNotices() {
    const sampleNotices = [
        {
            author: 'Property Developer',
            date: 'Apr 4, 2025',
            title: 'New Development Announcement',
            content: 'We are excited to announce a new apartment complex in Parramatta with 150 units, scheduled for completion in early 2026. Pre-sales starting next month.',
            location: 'Parramatta, Sydney'
        },
        {
            author: 'Financial Advisor',
            date: 'Apr 2, 2025',
            title: 'Investment Strategy Webinar',
            content: 'Join our webinar discussing investment strategies for the Sydney apartment market in 2026. We will cover financing options, suburb selection, and risk management.',
            location: 'Online - Registration Required'
        }
    ];
    
    // Append sample notices to existing notices
    const noticesContainer = document.getElementById('notices-container');
    
    sampleNotices.forEach(notice => {
        const noticeElement = document.createElement('div');
        noticeElement.className = 'col-md-6 mb-4';
        noticeElement.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-header bg-light d-flex justify-content-between">
                    <span>Posted by: ${notice.author}</span>
                    <span>${notice.date}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${notice.title}</h5>
                    <p class="card-text">${notice.content}</p>
                    <p class="card-text"><small>${notice.location}</small></p>
                </div>
            </div>
        `;
        
        noticesContainer.appendChild(noticeElement);
    });
}