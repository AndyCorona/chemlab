//package com.andy.server.utils;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * jwt 工具类
// */
//
//@Component
//public class JwtTokenUtils {
//    private static final String CLAIM_KEY_USERNAME = "sub";
//    private static final String CLAIM_KEY_CREATED = "created";
//
//
//    private static String secret;
//
//    private static Long expiration;
//
//    @Value("${jwt.secret}")
//    public void setSecret(String secret) {
//        JwtTokenUtils.secret = secret;
//    }
//
//    @Value("${jwt.expiration}")
//    public void setExpiration(Long expiration) {
//        JwtTokenUtils.expiration = expiration;
//    }
//
//    /**
//     * 根据用户信息生成 token
//     *
//     * @param userDetails
//     * @return
//     */
//    public static String generateToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
//        claims.put(CLAIM_KEY_CREATED, new Date());
//        return generateToken(claims);
//    }
//
//
//    /**
//     * 从 token 中获取用户名
//     *
//     * @param token
//     * @return
//     */
//    public static String getUserNameFromToken(String token) {
//        String username = null;
//        try {
//            Claims claims = getClaimsFromToken(token);
//            username = claims.getSubject();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return username;
//    }
//
//
//    /**
//     * 验证 token 是否有效
//     *
//     * @param token
//     * @param userDetails
//     * @return
//     */
//    public static boolean validateToken(String token, UserDetails userDetails) {
//        String username = getUserNameFromToken(token);
//        return userDetails.getUsername().equals(username) && !isTokenExpired(token);
//    }
//
//    /**
//     * 判断 token 是否可以被刷新
//     *
//     * @param token
//     * @return
//     */
//    public static boolean canRefresh(String token) {
//        return !isTokenExpired(token);
//    }
//
//
//    /**
//     * 刷新 token
//     *
//     * @param token
//     * @return
//     */
//    public static String refreshToken(String token) {
//        Claims claims = getClaimsFromToken(token);
//        claims.put(CLAIM_KEY_CREATED, new Date());
//        return generateToken(claims);
//    }
//
//    /**
//     * 判断 token 是否失效
//     *
//     * @param token
//     * @return
//     */
//    private static boolean isTokenExpired(String token) {
//        Date expireDate = getExpireDateFromToken(token);
//        return expireDate.before(new Date());
//    }
//
//
//    /**
//     * 从 token 中获取失效时间
//     *
//     * @param token
//     * @return
//     */
//    private static Date getExpireDateFromToken(String token) {
//        Claims claims = getClaimsFromToken(token);
//        return claims.getExpiration();
//    }
//
//    /**
//     * 从 token 中获取荷载
//     *
//     * @param token
//     * @return
//     */
//    private static Claims getClaimsFromToken(String token) {
//        Claims claims = null;
//        try {
//            claims = Jwts.parser()
//                    .setSigningKey(secret)
//                    .parseClaimsJws(token)
//                    .getBody();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return claims;
//    }
//
//    /**
//     * 根据 jwt 荷载生成 token
//     *
//     * @param claims
//     * @return
//     */
//    private static String generateToken(Map<String, Object> claims) {
//        return Jwts.builder()
//                .setClaims(claims)
//                .setExpiration(generateExpirationDate())
//                .signWith(SignatureAlgorithm.HS512, secret)
//                .compact();
//    }
//
//    /**
//     * 生成 token 失效时间
//     *
//     * @return
//     */
//    private static Date generateExpirationDate() {
//        return new Date(System.currentTimeMillis() + expiration * 1000);
//    }
//
//}
