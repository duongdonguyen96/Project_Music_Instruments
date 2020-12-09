package com.codegym.project.model.message;

import java.util.ArrayList;
import java.util.List;

public class MessageNotification {
    private List<String> stringListMessage = new ArrayList<>();
    private int code;
    public MessageNotification() {
    }

    public List<String> getStringListMessage() {
        return stringListMessage;
    }

    public void setStringListMessage(List<String> stringListMessage) {
        this.stringListMessage = stringListMessage;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    private Object object;
}
