document.addEventListener('DOMContentLoaded', () => {
    // 1. Bar Chart (Canvas)
    const barChartCanvas = document.getElementById('barChart');
    if (barChartCanvas) {
        const ctx = barChartCanvas.getContext('2d');
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const values = [12, 19, 8, 15, 22, 10, 17];
        const maxVal = Math.max(...values);
        
        let startTimestamp = null;
        const duration = 1000;

        function drawBarChart(progress) {
            const width = barChartCanvas.clientWidth;
            const height = barChartCanvas.clientHeight;
            
            // Set canvas resolution to match actual display size
            barChartCanvas.width = width;
            barChartCanvas.height = height;

            ctx.clearRect(0, 0, width, height);
            
            const padding = { top: 20, right: 20, bottom: 30, left: 30 };
            const chartWidth = width - padding.left - padding.right;
            const chartHeight = height - padding.top - padding.bottom;
            
            // Draw grid lines and Y-axis labels
            ctx.strokeStyle = '#E5E7EB';
            ctx.lineWidth = 1;
            ctx.beginPath();
            const gridLines = 5;
            for (let i = 0; i <= gridLines; i++) {
                const y = padding.top + (chartHeight / gridLines) * i;
                ctx.moveTo(padding.left, y);
                ctx.lineTo(width - padding.right, y);
                
                ctx.fillStyle = '#6B7280';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                const labelVal = Math.round(maxVal - (maxVal / gridLines) * i);
                ctx.fillText(labelVal, padding.left - 10, y);
            }
            ctx.stroke();

            // Draw bars
            const barWidth = (chartWidth / labels.length) * 0.6; // 60% of available space per bar
            const barSpacing = chartWidth / labels.length;

            for (let i = 0; i < labels.length; i++) {
                const val = values[i] * progress;
                const barHeight = (val / maxVal) * chartHeight;
                const x = padding.left + (barSpacing * i) + (barSpacing - barWidth) / 2;
                const y = height - padding.bottom - barHeight;

                // Gradient fill (#2563EB to #06B6D4)
                const gradient = ctx.createLinearGradient(0, y, 0, height - padding.bottom);
                gradient.addColorStop(0, '#06B6D4'); // Top
                gradient.addColorStop(1, '#2563EB'); // Bottom

                ctx.fillStyle = gradient;
                
                // Rounded top corners (6px)
                const radius = 6;
                ctx.beginPath();
                ctx.moveTo(x, y + radius);
                ctx.arcTo(x, y, x + radius, y, radius);
                ctx.arcTo(x + barWidth, y, x + barWidth, y + radius, radius);
                ctx.lineTo(x + barWidth, height - padding.bottom);
                ctx.lineTo(x, height - padding.bottom);
                ctx.fill();

                // X-axis labels
                ctx.fillStyle = '#6B7280';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(labels[i], x + barWidth / 2, height - padding.bottom + 10);
            }
        }

        function animateBars(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            drawBarChart(easeProgress);

            if (progress < 1) {
                window.requestAnimationFrame(animateBars);
            }
        }
        
        window.requestAnimationFrame(animateBars);

        // Handle resize for responsiveness
        window.addEventListener('resize', () => drawBarChart(1));
    }

    // 2. Donut Chart (Canvas)
    const donutChartCanvas = document.getElementById('donutChart');
    if (donutChartCanvas) {
        const ctx = donutChartCanvas.getContext('2d');
        const data = [
            {label: 'Completed', value: 45, color: '#10B981'},
            {label: 'In Progress', value: 28, color: '#2563EB'},
            {label: 'Pending', value: 15, color: '#F59E0B'},
            {label: 'Overdue', value: 12, color: '#EF4444'}
        ];
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let startTimestamp = null;
        const duration = 1000;
        
        function drawDonutChart(progress) {
            const width = donutChartCanvas.clientWidth;
            const height = donutChartCanvas.clientHeight;
            
            donutChartCanvas.width = width;
            donutChartCanvas.height = height;

            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;
            const lineWidth = 30;
            const radius = Math.min(cx, cy) - lineWidth; // Inner radius creates donut

            let currentAngle = -0.5 * Math.PI; // Start at top

            data.forEach(item => {
                const sliceAngle = (item.value / total) * 2 * Math.PI * progress;
                
                ctx.beginPath();
                ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = item.color;
                ctx.stroke();

                currentAngle += sliceAngle;
            });

            // Draw total count '100' in center with gray text
            ctx.fillStyle = '#6B7280';
            ctx.font = 'bold 24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(total, cx, cy);
        }

        function animateDonut(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            drawDonutChart(easeProgress);

            if (progress < 1) {
                window.requestAnimationFrame(animateDonut);
            }
        }
        
        window.requestAnimationFrame(animateDonut);

        window.addEventListener('resize', () => drawDonutChart(1));
    }

    // 3. Mini chart bars
    const miniBars = document.querySelectorAll('.mini-bar');
    miniBars.forEach(bar => {
        const height = bar.getAttribute('data-height');
        if (height) {
            setTimeout(() => {
                bar.style.height = `${height}%`;
            }, 50); // slight delay to allow CSS transitions if any
        }
    });
});
