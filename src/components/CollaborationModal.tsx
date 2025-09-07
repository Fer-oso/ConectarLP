import React, { useState, useEffect } from 'react';
import { X, User, Mail, Instagram, Phone, Link, MessageSquare } from 'lucide-react';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollaborationModal: React.FC<CollaborationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    insta: '',
    phone: '',
    link: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const STORAGE_KEY = 'conectarForm';

  // Persistencia local
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }, []);

  const saveForm = (data: typeof formData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    saveForm(newData);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInstagramBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const normalized = value ? (value.startsWith('@') ? value : '@' + value.replace(/^@+/, '')) : '';
    const newData = { ...formData, insta: normalized };
    setFormData(newData);
    saveForm(newData);
  };

  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const isURL = (value: string) => {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ingresá tu nombre completo';
    }
    if (!isEmail(formData.email.trim())) {
      newErrors.email = 'Ingresá un email válido';
    }
    if (!formData.insta.trim() || formData.insta.length < 3) {
      newErrors.insta = 'Ingresá tu usuario (ej: @tuusuario)';
    }
    if (!isURL(formData.link.trim())) {
      newErrors.link = 'Ingresá un link válido (http/https)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const text = `Hola, soy ${formData.name}. Mi correo es ${formData.email}. Mensaje: ${formData.message}`;
    const url = `https://wa.me/${"1130586473"}?text=${encodeURIComponent(text)}`;
   
      setShowThanks(true);
         setTimeout(() => {
          window.location.href = url;
      }, 3000);
      setFormData({
        name: '',
        email: '',
        insta: '',
        phone: '',
        link: '',
        message: ''
      });
      localStorage.removeItem(STORAGE_KEY);

      setTimeout(() => {
        setShowThanks(false);
        onClose();
      }, 5000);
    } catch (error) {
      alert('Hubo un problema al enviar. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown as any);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown as any);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className="modal-form-container">
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {showThanks ? (
          <div id="thanks" className="text-center">
            <h3 className="form-title">¡Gracias por aplicar! 🎉</h3>
            <p className="form-subtitle">
              Revisaremos tu perfil y te contactaremos pronto. 
              ¡Bienvenido a la comunidad Conectar!
            </p>
          </div>
        ) : (
          <>
            <h3 className="form-title">Aplicá a Conectar</h3>
            <p className="form-subtitle">
              Completá el formulario y te contactaremos para evaluar tu perfil
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name" className="required-field">
                    <User size={16} />
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Tu nombre y apellido"
                  />
                  <User className="input-icon" size={16} />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="email" className="required-field">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="tu@email.com"
                  />
                  <Mail className="input-icon" size={16} />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="insta" className="required-field">
                    <Instagram size={16} />
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="insta"
                    name="insta"
                    value={formData.insta}
                    onChange={handleInputChange}
                    onBlur={handleInstagramBlur}
                    className={errors.insta ? 'error' : ''}
                    placeholder="@tuusuario"
                  />
                  <Instagram className="input-icon" size={16} />
                  {errors.insta && <div className="error-message">{errors.insta}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+54 9 11 1234-5678"
                  />
                  <Phone className="input-icon" size={16} />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="link" className="required-field">
                    <Link size={16} />
                    Link a tu mejor contenido
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className={errors.link ? 'error' : ''}
                    placeholder="https://instagram.com/p/..."
                  />
                  <Link className="input-icon" size={16} />
                  {errors.link && <div className="error-message">{errors.link}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="message">
                    <MessageSquare size={16} />
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Contanos sobre tu estilo, audiencia, o cualquier cosa que quieras destacar..."
                    rows={4}
                  />
                  <MessageSquare className="input-icon" size={16} />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CollaborationModal;