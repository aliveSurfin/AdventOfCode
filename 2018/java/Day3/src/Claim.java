public class Claim {
private int x;
private int y;
private int claimNo;
private int w;
private int h;
public Claim(int claimNo, int x , int y, int w, int h){
    this.claimNo = claimNo;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getClaimNo() {
        return claimNo;
    }

    public void setClaimNo(int claimNo) {
        this.claimNo = claimNo;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    @Override
    public String toString() {
        return "Claim{" +
                "x=" + x +
                ", y=" + y +
                ", claimNo=" + claimNo +
                ", w=" + w +
                ", h=" + h +
                '}';
    }
}
