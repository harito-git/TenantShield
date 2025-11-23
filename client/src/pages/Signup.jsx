import { useState, useEffect, useRef } from 'react'
import '../App.css'

function Signup({ onSignup }) {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // include selectedLocation (may be null)
      onSignup({ fullName, address, location: selectedLocation })
    }, 600)
  }

  // Address autocomplete state
  const [suggestions, setSuggestions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const abortControllerRef = useRef(null)

  // debounce timer
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!address) {
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedLocation(null)
      return
    }

    // only search when user typed at least 5 characters
    if (address.length < 5) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
      abortControllerRef.current = new AbortController()
      const q = encodeURIComponent(address)
      const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1&limit=6`
      try {
        const res = await fetch(url, { signal: abortControllerRef.current.signal, headers: { 'Accept-Language': 'en' } })
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setSuggestions(data || [])
        setShowSuggestions(true)
        setHighlightIndex(-1)
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Autocomplete error', err)
      }
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [address])

  const handleSelectSuggestion = (item) => {
    // Build a short address: address line, city, state/province
    const addr = item.address || {}
    const line = [addr.house_number, addr.road, addr.pedestrian, addr.footway, addr.suburb, addr.neighbourhood].filter(Boolean).join(' ')
    const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || ''
    const state = addr.state || addr.state_district || addr.region || addr.province || ''
    const shortAddressParts = []
    if (line) shortAddressParts.push(line)
    if (city) shortAddressParts.push(city)
    if (state) shortAddressParts.push(state)
    const shortAddress = shortAddressParts.join(', ') || item.display_name

    setAddress(shortAddress)
    setSelectedLocation({ lat: item.lat, lon: item.lon, display_name: item.display_name, shortAddress, city, state })
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleAddressKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault()
        handleSelectSuggestion(suggestions[highlightIndex])
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="signup-root">
      <div className="signup-left">
        <div className="signup-logo-row">
          <div className="signup-logo-icon" aria-hidden="true">
<<<<<<< Updated upstream
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l7 4v5c0 5-3.58 9.74-7 11-3.42-1.26-7-6-7-11V6l7-4z" fill="#2563eb"/>
              <path d="M3 9.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" fill="#ffffff" />
=======
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4l24 9v15c0 13-10 25.5-24 33-14-7.5-24-20-24-33V13l24-9z" fill="#1E63D8"/>
              <path d="M20.5 30.5L32 22l11.5 8.5v12.75a1.75 1.75 0 01-1.75 1.75h-20.5a1.75 1.75 0 01-1.75-1.75V30.5z" fill="#0D2C5E"/>
              <path d="M18 31l14-10 14 10" stroke="#0D2C5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="30" y="34" width="4" height="4" rx="0.6" fill="#1E63D8"/>
              <rect x="30" y="40" width="4" height="4" rx="0.6" fill="#1E63D8"/>
              <rect x="36" y="34" width="4" height="4" rx="0.6" fill="#1E63D8"/>
>>>>>>> Stashed changes
            </svg>
          </div>
          <span className="signup-logo-text">Tenant Shield</span>
        </div>
        <div className="signup-badge">SMART ADDRESS MATCH</div>
        <h1 className="signup-title">Protecting your<br/>home starts here.</h1>
        <p className="signup-desc">
          We analyze local ordinances based on your specific address to find lease violations that generic tools miss.
        </p>
        <div className="signup-footer-row">
        </div>
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="signup-form-title">Let's get you started</h2>
          <p className="signup-form-desc">We just need a few details to customize your protection plan.</p>
          <div className="signup-form-group">
            <label htmlFor="fullName" className="signup-label">Full Name</label>
            <div className="signup-input-row">
              <span className="signup-input-icon">👤</span>
              <input
                id="fullName"
                className="signup-input"
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="signup-form-group" style={{ position: 'relative' }}>
            <label htmlFor="address" className="signup-label">Home Address</label>
            <div className="signup-input-row">
              <span className="signup-input-icon">🔍</span>
              <input
                id="address"
                className="signup-input"
                type="text"
                placeholder="e.g. 123 Example Road"
                value={address}
                onChange={e => { setAddress(e.target.value); setSelectedLocation(null) }}
                onKeyDown={handleAddressKeyDown}
                onFocus={() => { if (suggestions.length) setShowSuggestions(true) }}
                required
                autoComplete="off"
              />
            </div>

            {showSuggestions && suggestions && suggestions.length > 0 && (
              <ul className="suggestions-list" role="listbox" style={{
                position: 'absolute',
                left: 0,
                right: 0,
                marginTop: '6px',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                maxHeight: '220px',
                overflowY: 'auto',
                zIndex: 50,
                padding: '6px 0'
              }}>
                {suggestions.map((item, idx) => {
                  const addr = item.address || {}
                  const line = [addr.house_number, addr.road, addr.pedestrian, addr.footway, addr.suburb, addr.neighbourhood].filter(Boolean).join(' ')
                  const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || ''
                  const state = addr.state || addr.state_district || addr.region || addr.province || ''
                  const country = addr.country || ''
                  const postcode = addr.postcode || ''
                  const secondLine = [city, state, postcode, country].filter(Boolean).join(', ')

                  return (
                    <li
                      key={item.place_id || `${item.lat}-${item.lon}`}
                      role="option"
                      aria-selected={highlightIndex === idx}
                      onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(item) }}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        background: highlightIndex === idx ? '#eef2ff' : 'transparent'
                      }}
                    >
                      <div style={{ fontSize: '0.95rem', color: '#0f172a' }}>{line || item.display_name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{secondLine}</div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button
            className={`signup-submit${loading ? ' loading' : ''}`}
            type="submit"
            disabled={loading || !fullName || !address}
          >
            {loading ? 'Locating...' : 'Locate Property →'}
          </button>
          <div className="signup-form-footer-row">
            <span className="signup-form-footer-left">🔒 Secure Connection</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
