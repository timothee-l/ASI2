package model;

import java.io.Serializable;

public class User implements Serializable {
    private int id;
    private String surname;
    private String lastname;
    private String login;
    private String pwd;
    private int money;
    private String img;
    public User(int id, String surname, String lastname, String login, String pwd, int money, String img) {
        this.id = id;
        this.surname = surname;
        this.lastname = lastname;
        this.login = login;
        this.pwd = pwd;
        this.money = money;
        this.img = img;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
