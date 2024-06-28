package com.family.controller;

import nl.martijndwars.webpush.Subscription;
import org.springframework.web.bind.annotation.*;

import com.family.service.PushNotificationService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final PushNotificationService pushNotificationService;

    // In a real-world scenario, this would be stored in a database
    private final List<Subscription> subscriptions = new ArrayList<>();

    public NotificationController(PushNotificationService pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }

    @PostMapping("/subscribe")
    public void subscribe(@RequestBody Subscription subscription) {
        subscriptions.add(subscription);
    }

    @PostMapping("/notify")
    public void notifyAllUsers(@RequestParam String title, @RequestParam String body) {
        pushNotificationService.sendNotificationToAll(subscriptions, title, body);
    }
}
