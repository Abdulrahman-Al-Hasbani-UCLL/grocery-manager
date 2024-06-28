package com.family.service;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@Service
public class PushNotificationService {

    private PushService pushService;

    @Value("${vapid.public.key}")
    private String publicKey;

    @Value("${vapid.private.key}")
    private String privateKey;

    public PushNotificationService(PushService pushService) {
        this.pushService = pushService;
        Security.addProvider(new BouncyCastleProvider());

        try {
            this.pushService = new PushService()
                    .setSubject("mailto:your-email@example.com")
                    .setPublicKey(publicKey)
                    .setPrivateKey(privateKey);
        } catch (NoSuchAlgorithmException | NoSuchProviderException | InvalidKeySpecException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void sendNotification(Subscription subscription, String title, String body) {
        try {
            Notification notification = new Notification(
                    subscription,
                    "{\"title\":\"" + title + "\",\"body\":\"" + body + "\"}"
            );

            pushService.send(notification);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendNotificationToAll(List<Subscription> subscriptions, String title, String body) {
        for (Subscription subscription : subscriptions) {
            sendNotification(subscription, title, body);
        }
    }
}