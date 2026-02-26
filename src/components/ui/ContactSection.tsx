import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

export const ContactSection: React.FC = () => {
    const { ref } = useInView({ threshold: 0.1, triggerOnce: true });
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const [formData, setFormData] = useState({ entity: '', uplink: '', buffer: '' });
    const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS'>('IDLE');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('TRANSMITTING');

        // Simulación de encriptación y envío de datos
        setTimeout(() => {
            setStatus('SUCCESS');
        }, 2500);
    };

    const resetTerminal = () => {
        setFormData({ entity: '', uplink: '', buffer: '' });
        setStatus('IDLE');
    };

    return (
        <section id="contact-section" ref={ref} className="relative w-full py-16 md:py-32 bg-[#05070A] border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* COLUMNA IZQUIERDA: INFORMACIÓN Y REVERSIÓN DE RIESGO */}
                    <div className="w-full lg:w-5/12">
                        <div className="mb-8">
                            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 block animate-pulse">
                                {'>'} {t.nav.protocol} // SECURE_CHANNEL
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-6">
                                {t.contact.title} <span className="text-white/30 italic">{t.contact.title_ghost}</span>
                            </h2>
                            <p className="text-[#8B949E] text-base leading-relaxed font-sans mb-8">
                                {t.contact.desc}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 font-mono text-sm text-[#A1A1AA]">
                            <div className="flex items-start gap-4">
                                <span className="text-primary mt-1">::</span>
                                <div>
                                    <p className="text-white mb-1 tracking-widest text-xs">HQ_COORDINATES</p>
                                    <p>Pasco 632, Rosario<br />CP 2000, Argentina</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-primary mt-1">::</span>
                                <div>
                                    <p className="text-white mb-1 tracking-widest text-xs">DIRECT_UPLINK</p>
                                    <p>+54 341 2634200</p>
                                    <p className="text-primary hover:text-white transition-colors cursor-pointer">info@adn-electronica.com.ar</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: TERMINAL DE DATOS */}
                    <div className="w-full lg:w-7/12">
                        <div className="bg-[#0A0E17] border border-[#30363D] rounded-sm p-8 relative overflow-hidden shadow-2xl">

                            {/* ESTADO: FORMULARIO ACTIVO */}
                            {status !== 'SUCCESS' && (
                                <form onSubmit={handleSubmit} className={`flex flex-col gap-6 transition-opacity duration-500 ${status === 'TRANSMITTING' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">{t.contact.entity_label}</label>
                                            <input
                                                type="text"
                                                name="entity"
                                                required
                                                value={formData.entity}
                                                onChange={handleInputChange}
                                                placeholder={t.contact.entity_placeholder}
                                                className="w-full bg-black/40 border border-[#30363D] text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-primary focus:bg-white/[0.02] transition-colors placeholder:text-[#30363D]"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">{t.contact.uplink_label}</label>
                                            <input
                                                type="email"
                                                name="uplink"
                                                required
                                                value={formData.uplink}
                                                onChange={handleInputChange}
                                                placeholder={t.contact.uplink_placeholder}
                                                className="w-full bg-black/40 border border-[#30363D] text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-primary focus:bg-white/[0.02] transition-colors placeholder:text-[#30363D]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">{t.contact.buffer_label}</label>
                                        <textarea
                                            name="buffer"
                                            required
                                            rows={5}
                                            value={formData.buffer}
                                            onChange={handleInputChange}
                                            placeholder={t.contact.buffer_placeholder}
                                            className="w-full bg-black/40 border border-[#30363D] text-white font-sans text-sm px-4 py-3 resize-none focus:outline-none focus:border-primary focus:bg-white/[0.02] transition-colors placeholder:text-[#30363D]"
                                        ></textarea>
                                    </div>

                                    {/* MICRO-COPY DE SEGURIDAD (NDA) */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <p className="font-mono text-[9px] text-[#8B949E] tracking-widest uppercase">
                                            {t.contact.nda}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'TRANSMITTING'}
                                        className="mt-4 w-full bg-white text-black font-display font-bold uppercase tracking-widest py-4 hover:bg-primary transition-colors flex justify-center items-center gap-2 disabled:bg-[#30363D] disabled:text-[#8B949E]"
                                    >
                                        {status === 'TRANSMITTING' ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-[#8B949E] border-t-transparent rounded-full animate-spin"></span>
                                                {t.contact.transmitting}
                                            </>
                                        ) : (
                                            t.contact.submit
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* ESTADO: ÉXITO */}
                            {status === 'SUCCESS' && (
                                <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-6">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                    </div>
                                    <h3 className="font-mono text-primary tracking-widest uppercase mb-2">{t.contact.success_title}</h3>
                                    <p className="text-[#A1A1AA] text-sm mb-8 font-sans max-w-sm">
                                        {t.contact.success_desc}
                                    </p>
                                    <button
                                        onClick={resetTerminal}
                                        className="text-[10px] font-mono text-white tracking-widest uppercase border border-white/20 px-6 py-2 hover:border-primary hover:text-primary transition-colors"
                                    >
                                        {t.contact.reset}
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
