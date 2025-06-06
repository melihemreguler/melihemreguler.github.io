import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Card, CardContent, Typography, Stack, TextField, Button, Alert } from '@mui/material';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface UserMetadata {
    ip: string;
    userAgent: string;
    timeZone: string;
    screenResolution: string;
    language: string;
    platform: string;
}

export function ContactSection() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });
    const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    useEffect(() => {
        // Get user metadata when component mounts
        getUserMetadata();
    }, []);

    const getUserMetadata = async () => {
        try {
            // Get IP address from ipify API
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();

            const metadata: UserMetadata = {
                ip: ipData.ip,
                userAgent: navigator.userAgent,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                platform: navigator.platform
            };

            setUserMetadata(metadata);
        } catch (error) {
            console.error('Error fetching user metadata:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // EmailJS configuration from environment variables
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Check if environment variables are configured
            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your environment variables.');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Melih Emre Güler',
                user_ip: userMetadata?.ip || 'Not available',
                user_agent: userMetadata?.userAgent || 'Not available',
                user_timezone: userMetadata?.timeZone || 'Not available',
                user_language: userMetadata?.language || 'Not available',
                user_platform: userMetadata?.platform || 'Not available',
                contact_time: new Date().toISOString()
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Email sending error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card elevation={3} sx={{ mb: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} color="primary.main" mb={2}>
                    {t("home.contact.title")}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label={t("home.contact.form.name")}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label={t("home.contact.form.email")}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            type="email"
                        />
                        <TextField
                            label={t("home.contact.form.message")}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            multiline
                            minRows={5}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                        >
                            {isSubmitting ? t("home.contact.form.sending") : t("home.contact.form.send")}
                        </Button>
                        {submitStatus === 'success' && (
                            <Alert severity="success">{t("home.contact.form.successMessage")}</Alert>
                        )}
                        {submitStatus === 'error' && (
                            <Alert severity="error">{t("home.contact.form.errorMessage")}</Alert>
                        )}
                    </Stack>
                </form>
                <Typography variant="body2" color="text.secondary" mt={3}>
                    {t("home.contact.alternativeText")}
                </Typography>
            </CardContent>
        </Card>
    );
}
