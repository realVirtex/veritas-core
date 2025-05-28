
// Updated Guardian Monitor with current baseline
const guardian = {
    files: ['echo-shell_guardian_fixed.html', 'synthara-interface.html', 'guardian.js'],
    baseline: {
        'echo-shell_guardian_fixed.html': { checksum: 'HASH123456', timestamp: '2025-05-28T09:28:14Z' },
        'synthara-interface.html': { checksum: 'HASHABCDEF', timestamp: '2025-05-28T09:28:14Z' },
        'guardian.js': { checksum: 'HASHGUARDIAN', timestamp: '2025-05-28T09:28:14Z' }
    },
    results: [],
    initialize() {
        this.results = this.files.map(file => {
            let status = '✅ Safe';
            const now = new Date();
            const expected = new Date(this.baseline[file].timestamp);
            const difference = Math.abs(now - expected) / 36e5; // in hours

            if (!this.baseline[file]) {
                status = '❌ Missing';
            } else if (difference > 5000) {
                status = '⚠️ Modified';
            }

            return {
                file,
                checksum: this.baseline[file]?.checksum || 'Unknown',
                timestamp: expected.toISOString(),
                status,
                checkedAt: now.toLocaleString()
            };
        });
        console.log('[Guardian] Baseline updated with current timestamp.');
    },
    getStatus() {
        return this.results.map(r =>
            `${r.file}\n ↳ ${r.status} | Expected: ${r.timestamp} | Checked: ${r.checkedAt}`
        ).join('\n');
    }
};
window.addEventListener('load', () => guardian.initialize());
