package com.family.controller;

import org.springframework.web.bind.annotation.*;

import com.family.service.PushNotificationService;


@RestController
@RequestMapping("/api")
public class NotificationController {

    @SuppressWarnings("unused")
    private PushNotificationService pushNotificationService;

}
