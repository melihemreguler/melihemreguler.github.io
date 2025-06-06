import React, { useState } from 'react';
import { Avatar, Popover, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ClickableProfilePhotoProps {
    size?: number;
    sx?: any;
}

export function ClickableProfilePhoto({ size = 128, sx = {} }: ClickableProfilePhotoProps) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // Auto-close after 3 seconds
        setTimeout(() => {
            setAnchorEl(null);
        }, 3000);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Avatar
                src="/profile-photo.jpg"
                alt="Melih Emre Güler"
                onClick={handleClick}
                sx={{
                    width: size,
                    height: size,
                    boxShadow: 3,
                    border: '4px solid #fff',
                    bgcolor: 'primary.light',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                    ...sx
                }}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: {
                        p: 2,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '2px solid #FF69B4',
                        maxWidth: 200,
                        animation: 'bounce 0.5s ease-out',
                        '@keyframes bounce': {
                            '0%': {
                                transform: 'scale(0.3) translateY(10px)',
                                opacity: 0,
                            },
                            '50%': {
                                transform: 'scale(1.05) translateY(-5px)',
                                opacity: 0.8,
                            },
                            '100%': {
                                transform: 'scale(1) translateY(0px)',
                                opacity: 1,
                            },
                        },
                    },
                }}
            >
                <Box textAlign="center">
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: '#8B0000',
                            fontSize: '14px',
                            lineHeight: 1.4,
                        }}
                    >
                        {t('home.profilePhoto.embarrassedBubble')}
                    </Typography>
                </Box>
            </Popover>
        </>
    );
}
