import { useEffect, useRef } from 'react'

export default function HeroParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let disposed = false
    let teardown = () => undefined

    const setup = async () => {
      const THREE = await import('three')
      if (disposed) return

      const reducedMotion = document.documentElement.dataset.motion === 'reduced'
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
      camera.position.z = 4.6

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      const count = window.innerWidth < 760 ? 320 : 620
      const positions = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      for (let index = 0; index < count; index += 1) {
        const radius = 1.05 + Math.random() * 1.25
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[index * 3 + 1] = radius * 0.72 * Math.sin(phi) * Math.sin(theta)
        positions[index * 3 + 2] = radius * Math.cos(phi)
        sizes[index] = 0.55 + Math.random() * 0.75
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.PointsMaterial({
      color: 0xf0703a,
      size: window.innerWidth < 760 ? 0.022 : 0.028,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      })

      const points = new THREE.Points(geometry, material)
      points.rotation.z = -0.18
      scene.add(points)

      const blueGeometry = geometry.clone()
      const blueMaterial = material.clone()
      blueMaterial.color = new THREE.Color(0x4f7cff)
      blueMaterial.opacity = 0.18
      blueMaterial.size = 0.018
      const bluePoints = new THREE.Points(blueGeometry, blueMaterial)
      bluePoints.scale.setScalar(1.08)
      bluePoints.rotation.z = 0.21
      scene.add(bluePoints)

      let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let scrollProgress = 0
    let animationFrame = 0
    let inView = true
      let pageVisible = !document.hidden

      const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      }

      const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return
      targetX = (event.clientX / window.innerWidth - 0.5) * 2
      targetY = (event.clientY / window.innerHeight - 0.5) * 2
      }

      const onScroll = () => {
      const hero = mount.closest('.hero')
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1)
      }

      const render = (time = 0) => {
      if (!inView || !pageVisible) return
      currentX += (targetX - currentX) * 0.055
      currentY += (targetY - currentY) * 0.055
      const drift = reducedMotion ? 0 : time * 0.000035
      points.rotation.y = drift + currentX * 0.12 + scrollProgress * 0.34
      points.rotation.x = currentY * 0.08 - scrollProgress * 0.16
      bluePoints.rotation.y = -drift * 0.72 + currentX * 0.08
      bluePoints.rotation.x = -currentY * 0.06
      points.position.z = -scrollProgress * 0.48
      bluePoints.position.z = -scrollProgress * 0.28
      renderer.render(scene, camera)
      if (!reducedMotion) animationFrame = requestAnimationFrame(render)
      }

      const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      cancelAnimationFrame(animationFrame)
      if (inView && pageVisible && !reducedMotion) animationFrame = requestAnimationFrame(render)
      })

      const onVisibility = () => {
      pageVisible = !document.hidden
      cancelAnimationFrame(animationFrame)
      if (pageVisible && inView && !reducedMotion) animationFrame = requestAnimationFrame(render)
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(mount)
      visibilityObserver.observe(mount)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      resize()
      onScroll()
      render()

      teardown = () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('scroll', onScroll)
        document.removeEventListener('visibilitychange', onVisibility)
        geometry.dispose()
        blueGeometry.dispose()
        material.dispose()
        blueMaterial.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    void setup()

    return () => {
      disposed = true
      teardown()
    }
  }, [])

  return <div ref={mountRef} className="hero-particle-field" aria-hidden="true" />
}
