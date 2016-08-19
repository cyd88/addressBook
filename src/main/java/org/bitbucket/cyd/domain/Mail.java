package org.bitbucket.cyd.domain;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "mails")
public class Mail {

    @Id private String id;
    private String userTo;
    private String subject;
    private String body;

    private User userFrom;

    public Mail() {
        System.out.println("Default constructor");
    }

    public Mail(String userTo, String subject, String body, User userFrom) {
        this.userTo = userTo;
        this.subject = subject;
        this.body = body;
        this.userFrom = userFrom;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getUserTo() {
        return userTo;
    }

    public void setUserTo(String userTo) {
        this.userTo = userTo;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(User userFrom) {
        this.userFrom = userFrom;
    }
}
