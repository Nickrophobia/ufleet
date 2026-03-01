import { useState } from 'react';
import { ArrowRight, X, Check } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    from: '',
    to: '',
    loadType: '',
    fullName: '',
    phone: '',
    email: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to the terms and privacy policy before submitting.');
      return;
    }

    // In a real app you would send `formData` to a server here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />

      <div className="relative bg-navy border border-gold/30 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="font-display text-xl text-white">
            {isSubmitted ? 'Request Sent!' : 'Get a Quote'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-gold" />
              </div>
              <p className="text-gray-custom">
                Thank you! We will reach out with a quote shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-gray-custom text-sm mb-4">
                Tell us about your shipment and we’ll get back with pricing.
              </p>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Transport from<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="from"
                  type="text"
                  value={formData.from}
                  onChange={handleInputChange}
                  required
                  placeholder="Origin city / zip"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Transport to<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="to"
                  type="text"
                  value={formData.to}
                  onChange={handleInputChange}
                  required
                  placeholder="Destination city / zip"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Type of truck load<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="loadType"
                  type="text"
                  value={formData.loadType}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. dry van, flatbed, refrigerated"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Full Name<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Phone<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Your phone number"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-1.5">
                  Email<span className="text-gold ml-1">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              {/* terms checkbox */}
              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  id="agreeToTermsQuote"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 mt-1"
                />
                <label htmlFor="agreeToTermsQuote" className="text-white text-sm">
                  I agree to{' '}
                  <a href="/terms" className="underline">
                    terms &amp; conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="underline">
                    privacy policy
                  </a>{' '}
                  provided by the United Fleet Corp. By providing my phone number, I
                  agree to receive informational and transactional text messages and
                  emails from United Fleet Corp. No mobile opt-in data will be shared
                  with third parties. Message frequency varies. Message and data rates
                  may apply. Once opt-in text HELP for more information and reply STOP
                  to opt-out.
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-4 rounded text-sm mt-6 cursor-pointer"
              >
                Send Request
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
