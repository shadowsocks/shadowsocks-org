<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const methods = {
  'AEAD-2022 (Recommended)': [
    '2022-blake3-aes-128-gcm',
    '2022-blake3-aes-256-gcm',
    '2022-blake3-chacha20-poly1305',
  ],
  'AEAD': [
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm',
    'chacha20-ietf-poly1305',
    'xchacha20-ietf-poly1305',
  ],
  'Stream (Deprecated)': [
    'aes-128-cfb',
    'aes-192-cfb',
    'aes-256-cfb',
    'aes-128-ctr',
    'aes-192-ctr',
    'aes-256-ctr',
    'camellia-128-cfb',
    'camellia-192-cfb',
    'camellia-256-cfb',
    'chacha20-ietf',
    'bf-cfb',
    'rc4-md5',
  ],
}

const method = ref('2022-blake3-aes-256-gcm')
const password = ref('')
const hostname = ref('')
const port = ref(8388)
const plugin = ref('')
const tag = ref('')
const qrDataUrl = ref('')
const copied = ref(false)

let toDataURL: ((text: string) => Promise<string>) | null = null

function isAead2022(m: string): boolean {
  return m.startsWith('2022-blake3-')
}

function base64urlEncode(str: string): string {
  const encoded = btoa(str)
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const uri = computed(() => {
  if (!password.value || !hostname.value || !port.value) return ''

  let userinfo: string
  if (isAead2022(method.value)) {
    userinfo = encodeURIComponent(method.value) + ':' + encodeURIComponent(password.value)
  } else {
    userinfo = base64urlEncode(method.value + ':' + password.value)
  }

  let result = `ss://${userinfo}@${hostname.value}:${port.value}`

  if (plugin.value) {
    result += '/?plugin=' + encodeURIComponent(plugin.value)
  }

  if (tag.value) {
    result += '#' + encodeURIComponent(tag.value)
  }

  return result
})

onMounted(async () => {
  const qr = await import('qrcode')
  toDataURL = qr.toDataURL

  watch(uri, async (val) => {
    if (val && toDataURL) {
      qrDataUrl.value = await toDataURL(val)
    } else {
      qrDataUrl.value = ''
    }
  }, { immediate: true })
})

async function copyUri() {
  if (!uri.value) return
  await navigator.clipboard.writeText(uri.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="sip002-generator">
    <div class="form-grid">
      <div class="field">
        <label for="sip002-method">Method</label>
        <select id="sip002-method" v-model="method">
          <optgroup v-for="(group, label) in methods" :key="label" :label="label">
            <option v-for="m in group" :key="m" :value="m">{{ m }}</option>
          </optgroup>
        </select>
      </div>

      <div class="field">
        <label for="sip002-password">Password / Key</label>
        <input id="sip002-password" v-model="password" type="text" placeholder="Enter password or PSK" />
      </div>

      <div class="field">
        <label for="sip002-hostname">Hostname</label>
        <input id="sip002-hostname" v-model="hostname" type="text" placeholder="e.g. 192.168.100.1" />
      </div>

      <div class="field">
        <label for="sip002-port">Port</label>
        <input id="sip002-port" v-model.number="port" type="number" min="1" max="65535" />
      </div>

      <div class="field">
        <label for="sip002-plugin">Plugin <span class="optional">(optional)</span></label>
        <input id="sip002-plugin" v-model="plugin" type="text" placeholder="e.g. obfs-local;obfs=http" />
      </div>

      <div class="field">
        <label for="sip002-tag">Tag <span class="optional">(optional)</span></label>
        <input id="sip002-tag" v-model="tag" type="text" placeholder="e.g. My Server" />
      </div>
    </div>

    <div v-if="uri" class="output">
      <label>Generated URI</label>
      <div class="uri-row">
        <code class="uri-text">{{ uri }}</code>
        <button class="copy-btn" @click="copyUri">{{ copied ? 'Copied!' : 'Copy' }}</button>
      </div>

      <div v-if="qrDataUrl" class="qr-wrapper">
        <img :src="qrDataUrl" alt="QR Code" class="qr-code" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sip002-generator {
  margin-top: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.optional {
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.field input,
.field select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus,
.field select:focus {
  border-color: var(--vp-c-brand-1);
}

.output {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
}

.output > label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 0.5rem;
}

.uri-row {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.uri-text {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8125rem;
  word-break: break-all;
  color: var(--vp-c-text-1);
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 0.85;
}

.qr-wrapper {
  margin-top: 1rem;
  text-align: center;
}

.qr-code {
  border-radius: 4px;
  max-width: 200px;
}
</style>
