// Container compatibility only. Normal hosts retain their native statistics.
const original = process.memoryUsage;
process.memoryUsage = function () { try { return original(); } catch (e) { if(e.code==='ENOENT') return {rss:0,heapTotal:0,heapUsed:0,external:0,arrayBuffers:0};throw e; } };
process.memoryUsage.rss = () => { try { return original.rss(); } catch { return 0; } };
