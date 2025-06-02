# EmailJS Kurulum Rehberi

## 1. EmailJS Hesabı Oluşturma
1. [EmailJS.com](https://www.emailjs.com/) sitesine gidin
2. "Sign Up" ile hesap oluşturun (ücretsiz)
3. Email adresinizi doğrulayın

## 2. Email Servisi Ekleme
1. Dashboard'a giriş yapın
2. "Add New Service" tıklayın
3. Email sağlayıcınızı seçin:
   - Gmail
   - Outlook/Hotmail
   - Yahoo
   - Custom SMTP
4. Email hesabınızla bağlantı kurun

## 3. Email Template Oluşturma
1. "Create New Template" tıklayın
2. Template içeriği:

```
Subject: Portfolio Sitesi - Yeni Mesaj ({{from_name}})

Merhaba Melih,

{{from_name}} isimli kişiden yeni bir mesaj aldınız:

Gönderen: {{from_name}}
Email: {{from_email}}
Mesaj:
{{message}}

---
Bu mesaj portfolio sitenizden gönderilmiştir.
```

3. Template'i kaydedin ve Template ID'yi alın

## 4. Konfigürasyon Değerleri
EmailJS kurulumu tamamlandıktan sonra şu değerleri ContactSection.tsx dosyasında güncelleyin:

- **Service ID**: EmailJS Dashboard > Services
- **Template ID**: EmailJS Dashboard > Templates  
- **Public Key**: EmailJS Dashboard > Settings > API Keys

## 5. Güncellenecek Dosya
`src/components/pages/home/ContactSection.tsx` dosyasındaki bu satırları değiştirin:

```typescript
const serviceId = 'YOUR_SERVICE_ID';      // EmailJS Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // EmailJS Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';      // EmailJS Public Key
```

## 6. Test Etme
1. Formu doldurun
2. "Mesaj Gönder" butonuna tıklayın
3. Email adresinizi kontrol edin

Bu adımları tamamladıktan sonra form tam olarak çalışacak!
