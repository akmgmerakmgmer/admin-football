import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { Facebook, Instagram } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px auto',
        maxWidth: 600,
        padding: theme.spacing(3),
        textAlign: 'center',
        '& .MuiListItem-root': {
            justifyContent: 'center',
        },
    },
}));

const ContactUs: React.FC = () => {
    const { t } = useTranslation()
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Contact Us
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Facebook />
                    </ListItemIcon>
                    <ListItemText primary={t('facebookPage')} secondary={<a target='_blank' href='https://www.facebook.com/Discountaty'>{t('clickHere')}</a>} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Instagram />
                    </ListItemIcon>
                    <ListItemText
                        primary={t('instagramPage')}
                        secondary={<a target='_blank' href='https://www.instagram.com/_discountaty/'>{t('clickHere')}</a>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('email')} secondary="discountaty.store@gmail.com" />
                </ListItem>
            </List>
        </div>
    );
};

export default ContactUs;