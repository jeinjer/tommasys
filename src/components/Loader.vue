<template>
  <Transition name="fade">
    <div v-if="visible" class="global-loader" aria-hidden="true">
      <div class="loader-container">
        
        <!-- Premium Computer Loading Mockup -->
        <div class="computer-mockup">
          <!-- Monitor screen frame -->
          <div class="monitor-frame">
            <!-- Glare reflection effect on screen -->
            <div class="screen-glare"></div>
            
            <!-- Code terminal inside monitor -->
            <div class="terminal-window">
              <!-- Window top bar with macOS style dots -->
              <div class="terminal-header">
                <span class="win-dot dot-red"></span>
                <span class="win-dot dot-yellow"></span>
                <span class="win-dot dot-green"></span>
                <span class="terminal-title">bash - tommasys</span>
              </div>
              
              <!-- Console content -->
              <div class="terminal-body">
                <div class="cmd-line cmd-1">
                  <span class="prompt">$</span> npm run dev
                </div>
                <div class="cmd-line cmd-2">
                  <span class="status-icon">●</span> video_bg: loading...
                </div>
                <div class="cmd-line cmd-3">
                  <span class="status-icon">●</span> assets_img: ok
                </div>
                
                <!-- Inner progress bar in the console -->
                <div class="console-progress">
                  <div class="console-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Computer Stand -->
          <div class="monitor-stand"></div>
          <div class="monitor-base"></div>
        </div>

        <!-- Orange loading text under the computer -->
        <p class="loader-text">
          cargando<span class="blink-dots"></span>
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.global-loader {
  position: fixed;
  inset: 0;
  background-color: #ffffff;
  background-image: radial-gradient(circle at 50% 50%, rgba(232, 96, 28, 0.04) 0%, rgba(255, 255, 255, 0) 75%);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  -webkit-font-smoothing: antialiased;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ─── Computer Mockup ─── */
.computer-mockup {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.95);
  animation: floatMockup 4s ease-in-out infinite;
}

.monitor-frame {
  position: relative;
  width: 270px;
  height: 170px;
  background: #111111;
  border: 10px solid #1e1e1f;
  border-radius: 14px;
  box-shadow: 
    0 25px 50px -12px rgba(232, 96, 28, 0.15),
    0 15px 30px -10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.screen-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 150%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 50%);
  transform: rotate(-30deg) translate(-20%, -30%);
  z-index: 5;
  pointer-events: none;
}

/* Stand and base */
.monitor-stand {
  width: 38px;
  height: 28px;
  background: #2a2a2c;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  border-bottom: 2px solid #181819;
}

.monitor-base {
  width: 90px;
  height: 6px;
  background: #333335;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ─── Terminal Screen ─── */
.terminal-window {
  width: 100%;
  height: 100%;
  background: #121214;
  display: flex;
  flex-direction: column;
  font-family: 'Courier New', Courier, monospace;
}

.terminal-header {
  height: 24px;
  background: #1a1a1e;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.win-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.terminal-title {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.65rem;
  margin-left: auto;
  letter-spacing: 0.05em;
  font-family: sans-serif;
  font-weight: 500;
}

.terminal-body {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.cmd-line {
  font-size: 0.72rem;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  width: 0; /* Animate width for typing effect */
}

.prompt {
  color: #e8601c;
  font-weight: bold;
}

.status-icon {
  color: #ffbd2e;
  font-size: 0.6rem;
  margin-right: 4px;
}

/* Typing animations */
.cmd-1 {
  color: #ffffff;
  animation: typing 0.8s steps(20) forwards 0.2s;
}

.cmd-2 {
  color: rgba(255, 255, 255, 0.8);
  animation: typing 0.8s steps(25) forwards 1.2s;
}

.cmd-3 {
  color: rgba(255, 255, 255, 0.8);
  animation: typing 0.6s steps(20) forwards 2.2s;
}

.cmd-3 .status-icon {
  animation: greenStatus 0.1s forwards 2.7s;
}

.console-progress {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1px;
  margin-top: auto;
  overflow: hidden;
}

.console-progress-fill {
  width: 0;
  height: 100%;
  background: #e8601c;
  box-shadow: 0 0 8px rgba(232, 96, 28, 0.6);
  animation: loadProgress 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* ─── Loader Text Under PC ─── */
.loader-text {
  margin-top: 2.2rem;
  font-family: 'Saira', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #e8601c;
  letter-spacing: 0.25em;
  text-indent: 0.25em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.blink-dots::after {
  content: '';
  animation: dotsBlink 1.5s infinite steps(4);
  width: 1.5em;
  text-align: left;
  display: inline-block;
}

/* KEYFRAMES */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes greenStatus {
  to { color: #27c93f; }
}

@keyframes loadProgress {
  0% { width: 0; }
  35% { width: 30%; }
  65% { width: 55%; }
  90%, 100% { width: 100%; }
}

@keyframes floatMockup {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes dotsBlink {
  0%, 100% { content: ""; }
  25% { content: "."; }
  50% { content: ".."; }
  75% { content: "..."; }
}

/* Vue Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
