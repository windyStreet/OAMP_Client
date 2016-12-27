/**
 * Created by Administrator on 2016/12/22.
 */
/**
 * 查询语句and条件参数:使用例子：AndSP.EQ
 *
 * @author Administrator
 *
 */
global.AndSP = {
    AND: 1,
    /***
     * =
     */
    EQ: 11,
    /***
     * '%ff%'
     */
    FULLLIKE: 12,
    /***
     * '%kkk'
     */
    LLIKE: 13,
    /***
     * 大于
     */
    GT: 14,
    /***
     * 小于
     */
    LT: 15,
    /***
     * 大于等于
     */
    GET: 16,
    /***
     * 小于等于
     */
    LET: 17,
    /***
     * 不等于<>
     */
    NOTEQ: 18,
    /***
     * 'ff%'
     */
    RLIKE: 19,
    /***
     * not like '%ff'
     */
    NLLIKE: 110,
    /***
     * not like %ff%
     */
    NFLIKE: 111,
    /***
     * not like ff%
     */
    NRLIKE: 112,
    /***
     * is null
     */
    ISNULL: 113,
    /***
     * is not null
     */
    ISNOTNULL: 114,
    /***
     * in :
     */
    IN: 115,
    /***
     * not in :
     */
    NOTIN: 116
};

/**
 * 查询语句or条件参数:使用例子：OrSP.EQ
 *
 * @author Administrator
 *
 */
global.OrSP =
{
    OR: 2,
    /***
     * =
     */
    EQ: 21,
    /***
     * '%ff%'
     */
    FULLLIKE: 22,
    /***
     * '%kkk'
     */
    LLIKE: 23,
    /***
     * 大于
     */
    GT: 24,
    /***
     * 小于
     */
    LT: 25,
    /***
     * 大于等于
     */
    GET: 26,
    /***
     * 小于等于
     */
    LET: 27,
    /***
     * 不等于<>
     */
    NOTEQ: 28,
    /***
     * 'ff%'
     */
    RLIKE: 29,
    /***
     * not like '%ff'
     */
    NLLIKE: 210,
    /***
     * not like %ff%
     */
    NFLIKE: 211,
    /***
     * not like ff%
     */
    NRLIKE: 212,
    /***
     * is null
     */
    ISNULL: 213,
    /***
     * is not null
     */
    ISNOTNULL: 214,
    /***
     * in :
     */
    IN: 215,
    /***
     * not in :
     */
    NOTIN: 216
}

